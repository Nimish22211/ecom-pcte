# Chat Feature — Implementation Summary

## What it does

Verified students can message each other in real time about a listing. Each **pair of people** has exactly one chat thread, no matter how many products they've discussed or who was buying/selling in each case. All messages persist in MongoDB. A student can have many simultaneous threads with different people, see them all in a "Chats" list, and send/receive messages live via Socket.IO.

---

## Core design decision: room = two people, not "buyer + product"

The PRD's original idea was `roomId = buyerId_productId` (one thread per buyer-product pair). That created a new thread every time the same two people talked about a different product, or swapped buyer/seller roles. We changed it to:

```
roomId = [personA_id, personB_id].sort().join('_')
```

Sorting the two IDs before joining makes the room **order-independent** — it doesn't matter who initiates or who's buying vs. selling, the same two people always land in the same room.

This logic lives in one place: `backend/utils/resolveRoom.js` (`buildRoomId`), and the frontend computes the identical roomId client-side in `ProductDetailPage.jsx`'s `handleChat`.

---

## Data models

### `Message` (`backend/models/Message.js`)
One document per chat message. Unchanged from the original design:
```js
{ roomId, senderId, text, createdAt }
```

### `Conversation` (`backend/models/Conversation.js`)
One document per **pair of people** — this is what makes the "Chats" list cheap to load (no need to scan every message to figure out who's talked to whom).
```js
{ roomId, participants: [idA, idB], lastMessage, lastMessageAt }
```
It's created/updated (upserted) every time a message is sent — not when a chat is merely opened. So a conversation only appears in someone's list once a message has actually been exchanged.

---

## Backend pieces

### `utils/resolveRoom.js`
Given a `roomId` string, this is the single source of truth for "is this room real, and who's allowed in it":
- **`resolveRoom(roomId)`** — splits the roomId into two IDs, validates they're real ObjectIds, looks up both Student records. Returns `null` if the roomId is malformed or either person doesn't exist.
- **`isRoomParticipant(room, user)`** — true only if `user` is one of the two people in the room **and** both people belong to the same college (this enforces the marketplace's college-isolation rule for chat too).

Both the REST controller and the socket handler call into this same helper, so authorization logic isn't duplicated or able to drift out of sync.

### `middleware/authenticateSocket.js`
Runs once when a Socket.IO client connects (`io.use(authenticateSocket)` in `index.js`). It verifies the JWT sent in the connection handshake and attaches the real user document as `socket.user`. If there's no valid token, the connection is rejected outright — there's no way to open a socket without being logged in.

### `socket/chatHandler.js`
Registered per-connection in `index.js`. Handles three events:
- **`join_room`** — checks `isRoomParticipant`, then `socket.join(roomId)` so this socket starts receiving that room's messages.
- **`leave_room`** — `socket.leave(roomId)`. The client calls this when switching away from a thread, so a socket doesn't stay subscribed to every room it's ever opened during a session.
- **`send_message`** — checks authorization, saves the message to `Message`, upserts the `Conversation` (`lastMessage`/`lastMessageAt`), then emits:
  - `receive_message` to the room (`roomId`) — delivers the message to anyone with that specific thread open right now.
  - `conversation_updated` to **both participants' personal rooms** — so their Chats *list* updates live even if they don't currently have that thread open.

Critically, **the sender's identity always comes from `socket.user`** (set by the auth middleware), never from whatever the client claims in the message payload. This closes the obvious spoofing hole — a malicious client can't send a message pretending to be someone else.

### `index.js` wiring
```js
io.use(authenticateSocket);
io.on('connection', (socket) => {
  socket.join(String(socket.user._id));  // personal room, for conversation_updated
  chatHandler(io, socket);
});
```

### `controllers/chatController.js` + `routes/chat.js`
- **`GET /api/chat/conversations`** — all of the logged-in user's threads, each with the other person's name, last message, and timestamp. Sorted by most recent.
- **`GET /api/chat/:roomId`** — full message history for one thread. Authorized the same way as the socket events (`resolveRoom` + `isRoomParticipant`) — you can't fetch another pair's messages by guessing a roomId.

(`/conversations` is registered before `/:roomId` in the router so Express doesn't try to treat the literal word "conversations" as a roomId.)

---

## Frontend pieces

### `src/socket.js`
```js
io(url, { autoConnect: false, auth: (cb) => cb({ token: localStorage.getItem('token') }) })
```
`autoConnect: false` means the socket doesn't try to connect before someone's logged in. The `auth` callback re-reads the token fresh on every connection attempt, so it always sends the current session's JWT.

### `src/context/AuthContext.jsx`
A `useEffect` watches the `user` state and calls `socket.connect()` / `socket.disconnect()` to match. This runs on mount too, so refreshing the page while logged in reconnects automatically; logging out tears the connection down.

### `src/services/api.js`
Added `getConversations()` — the only new REST call needed; `getChatHistory(roomId)` already existed.

### `src/pages/student/ProductDetailPage.jsx`
"Chat with Seller" computes `roomId = [user._id, sellerId].sort().join('_')` and navigates to `/student/chats` with that roomId (and the seller's name) in router state.

### `src/pages/student/Chats.jsx`
Two-pane layout:
- **Left — conversation list.** Loaded via `getConversations()` on mount. Re-fetched whenever a `conversation_updated` socket event arrives, so the list re-sorts and shows new threads without a manual refresh.
- **Right — active thread.** Whichever conversation is selected (either clicked in the list, or passed in via navigation state from a product page). On selection: fetches history (`getChatHistory`), joins that socket room (`join_room`), and listens for `receive_message`. On leaving that thread (switching to another, or unmounting), emits `leave_room` and unsubscribes.

A message handler ignores anything whose `roomId` doesn't match the currently active thread — this guards against stray events from rooms the socket joined earlier in the session but hasn't explicitly left yet.

---

## End-to-end walkthroughs

**Starting a brand-new chat:** Student A opens Student B's product → clicks "Chat with Seller" → frontend computes `roomId = sort(A,B)` → navigates to Chats with that roomId → no conversation exists yet (no message sent), so it doesn't show in either list yet → A types and sends → server validates A is a participant, saves the message, **creates** the `Conversation` row, emits `receive_message` (to anyone with the room open) and `conversation_updated` (to both A's and B's personal rooms) → B's Chats list (if open) updates instantly, even though B never opened that specific thread.

**Same two people, different product, reversed roles:** B is now buying from A on a different listing → `roomId = sort(A,B)` computes to the **identical** string as before → same `Conversation` document is updated, same message history — one continuous thread, exactly as required.

**Two people chatting simultaneously:** Each has their own socket connection, both joined to the shared `roomId` room. `send_message` from either side broadcasts `receive_message` to that room, so both browser sessions see new messages in real time without polling.

**Multiple conversations:** A user's socket also sits in their personal room (joined by user ID). Every `Conversation` they're a participant in surfaces through `GET /api/chat/conversations`, completely independent of how many distinct people or products are involved.

---

## Security summary

| Risk | Mitigation |
|---|---|
| Spoofing another user's messages | Sender identity always comes from the authenticated socket (`socket.user`), never client input |
| Reading someone else's conversation by guessing a roomId | `isRoomParticipant` checked on every `join_room`, `send_message`, and `GET /api/chat/:roomId` |
| Cross-college chat | `isRoomParticipant` also requires both participants share a `collegeId` |
| Anonymous socket connections | `io.use(authenticateSocket)` rejects any connection without a valid JWT |
| Stale room subscriptions | Explicit `leave_room` when switching threads |

---

## Known limitation (action needed before relying on old data)

The `Conversation` schema changed shape (`buyerId/sellerId/productId` → `participants`). Any conversations created under the old schema won't match the new queries and will effectively disappear from chat lists. If you have pre-existing data in that collection, drop it:
```js
db.conversations.drop()
```
`Message` documents are unaffected — they were always generic `roomId` records and didn't change shape.
