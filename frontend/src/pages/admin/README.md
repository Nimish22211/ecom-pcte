# pages/admin/

Three pages only the dean can access.

## Files to create

### DeanLoginPage.jsx — Route: `/admin/login` (public)
Same as student LoginPage but for the dean. On submit:
1. Call Firebase `signInWithEmailAndPassword(auth, email, password)`
2. Get the token: `result.user.getIdToken()`
3. Call `deanLogin(token)` from `services/api.js`
4. Store result in AuthContext via `login(data.user, data.token)`
5. Redirect to `/admin/dashboard`

Show error if login fails.

---

### DeanDashboardPage.jsx — Route: `/admin/dashboard` (dean only)
The dean's home screen. Has two states based on whether the dean has already set up their college.

**On page load:** call `getMyCollege()` to check.

**If college does NOT exist yet** (`null` response):
Show a "Set Up Your College Profile" form with: College Name, Email Domain (e.g. `@mitcollege.edu.in`), City. Submit calls `createCollege({ name, emailDomain, city })`, then refresh the page.

**If college ALREADY exists:**
Show college info (name, domain, city — read-only). Show two stat numbers: Pending Approvals (amber) and Verified Students (green). Button: "Review Pending Students" → navigate to `/admin/students`.

To get the counts: call `getUnverifiedStudents()` and `getAllStudents()` and use `.length`.

---

### StudentTablePage.jsx — Route: `/admin/students` (dean only)
Table of students with two tabs: "Pending Approval" and "All Students".

On page load: call both `getUnverifiedStudents()` and `getAllStudents()`.

Table columns: Name | Email | Roll Number | Registered On | Status | Action

- **Pending tab**: Action column shows a green "Approve" button → calls `approveStudent(student._id)` → remove that student from the pending list in state immediately (don't reload the page)
- **All Students tab**: Action column not needed, just show status badge

Show a loading state while data is fetching.
