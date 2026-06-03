# context/

Global state shared across all pages. Your senior writes the files here. You only read from them.

## Files to create

### AuthContext.jsx
Stores the currently logged-in user so every page can access it without passing props.

**Your senior writes this file.** You just use it in your pages like this:

```jsx
import { useAuth } from '../context/AuthContext';

const { user, login, logout } = useAuth();
```

`user` is `null` if nobody is logged in, or an object with these fields:

```js
// Student
{ _id, name, email, rollNumber, status, collegeId, role: "student" }

// Dean
{ _id, name, email, role: "dean", collegeId }
```

`login(userData, token)` — call this after a successful login to store the user.
`logout()` — call this when the user clicks Logout.
