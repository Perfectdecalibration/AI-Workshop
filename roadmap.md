# Roadmap

## What this is
A study task list for people learning a language. Each task is tagged with one language skill, and the site shows which skill you have been avoiding.

## What Done means
A stranger opens the live site, creates an account with a made-up email address and a password, and adds a few study tasks, each tagged with one of six skills: Reading, Writing, Listening, Speaking, Vocabulary, Grammar. They mark some tasks done. The page shows how many tasks they have completed in each skill and names the skill with the fewest completed tasks as most avoided. They sign out, sign back in later, and every task, its skill tag, and its done status are still there. Nobody else who signs in can see their tasks.

## Slices
1. Sign up and log in | done-criteria: (1) On the live site, a person signs up with a made-up email and a password and lands on a page showing "Signed in as" followed by that email; (2) the person clicks Sign out and sees the sign-in form, with their email no longer on the page; (3) the person signs in with the right email and a wrong password, sees an error message, and stays signed out, then signs in with the right password and sees "Signed in as" their email again; (4) while signed in, the person closes the tab, reopens the site URL, and still sees "Signed in as" their email without typing a password | status: ACTIVE
2. Tasks tagged by skill | done-criteria: (1) Signed in, a person types "Read one news article", picks Reading from a menu listing exactly the six skills, clicks Add, and sees the task appear labeled Reading; (2) the person reloads the page and the task is still there, labeled Reading; (3) the person ticks the task's done checkbox, reloads, and the task still shows as done; (4) the person signs out, signs up as a second made-up account, and sees an empty task list with none of the first account's tasks | status: pending
3. Most avoided skill | done-criteria: (1) Signed in, a person sees all six skills listed with a number next to each, and each number matches how many done tasks with that tag are in their list; (2) with exactly one done task in every skill except Speaking, which has none, the page shows "Most avoided: Speaking"; (3) from that state, the person marks two Speaking tasks done and reloads, Speaking's number goes from 0 to 2, and the Most avoided line lists the other five skills and not Speaking | status: pending

## Backlog
- Password reset
- Email confirmation on sign-up
- Google or other social sign-in
- Editing a task's text or skill
- Deleting tasks
- Due dates and reminders
- Custom skills beyond the six
- Choosing which language you are studying
- A time window for most avoided, such as the last 7 days
- Charts, streaks, or history
- Sharing lists or study groups
- Profile page
- Dark mode
- Mobile app
