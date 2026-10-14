# Project state
Last updated: 2026-10-14

## Works
- The Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-steel-psi.vercel.app/
- Slice 1, sign up and log in, is done (marked DONE in roadmap.md, merged to main on 2026-09-30 in PR #4).
- On the live site, a person can create an account with an email address and a password, and then sees "Signed in as" followed by their email.
- A person can sign out, which takes them back to the sign-in form.
- A person can sign back in with their email and password. If the password is wrong, they see an error message and stay signed out.
- A person who closes the tab and comes back to the site is still signed in, without typing their password again.
- Slice 2, tasks tagged by skill, is done (marked DONE in roadmap.md, merged to main on 2026-10-14 in PR #5).
- A signed-in person can add a task tagged with one of the six skills, and sees their tasks newest first, each with a skill label.
- A person can tick a task done, and it saves straight away.
- Tasks, their skill tags and their done status survive a reload.
- Each account sees only its own tasks.

## In progress
- Slice 3, most avoided skill, is ACTIVE. No code for it yet.

## Broken or flaky
- npm run lint does not work. Next.js 16 removed the next lint command. Fixing it needs eslint and eslint-config-next added as dependencies, which has not been approved yet.

## Environment notes
- The site talks to Supabase through @supabase/supabase-js, set up in app/supabaseClient.ts. @supabase/ssr was not added.
- The code reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. These must be in .env.local and in Vercel environment variables.
- Not yet recorded: whether "Confirm email" is off in Supabase. Slice 1 passing suggests it is off.
- Claude Code runs in the browser at claude.ai/code with this repo already selected.
- The tasks table was created by hand in the Supabase SQL Editor and is not saved anywhere in the repo. Columns: id, user_id (default auth.uid()), title (must not be blank), skill (one of the six), done (default false), created_at.
- Row level security is on for the tasks table, with select, insert and update policies limited to the person's own rows. There is no delete policy.
- The preview site and the main site share one Supabase database. Signing out on either one signs that account out everywhere.

## Decisions
- 2026-10-14: Added slice 4, Due dates, status pending. Due dates are optional and stored as a plain date (no time). The overdue check runs in the browser so it uses the person's local date, not the server's UTC clock. Done tasks and tasks due today are never Overdue.
- 2026-10-14: Reminders stay in the Backlog. They need email or notifications, which means a new service.
- 2026-10-14: Task priority (Low, Normal, High) considered and not chosen. Not in the roadmap.
- 2026-10-14: The commit titled "Implement due dates for tasks with overdue notifications" only updated roadmap.md. No due-date code exists yet.
- 2026-10-14: Slice 2 criterion 4 (a new account sees an empty list) was checked on the PR #5 preview deployment, not on the main site. Same code and same database.

## Next session
- Build slice 3, most avoided skill.
