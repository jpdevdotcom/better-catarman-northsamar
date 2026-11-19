# Your first pull request

This guide walks you through sending a change to BetterCatarman.org, step by step. It assumes you have never done this before. If you have, the [short version](#the-short-version) is at the end.

You don't need permission to start. Anyone can copy the project, make a change and ask for it to be added. Every change is reviewed by the maintainer before it goes on the site, so you can't break anything by trying.

Before you change any facts on the site, read the [content rules in CONTRIBUTING.md](../CONTRIBUTING.md#the-rules-for-content). The most important one: **every fact needs a source.**

## Contents

1. [How it works](#how-it-works)
2. [Words you'll see](#words-youll-see)
3. [Choose a way](#choose-a-way)
4. [Way 1: Edit in your browser](#way-1-edit-in-your-browser)
5. [Way 2: Work on your computer](#way-2-work-on-your-computer)
6. [After you open the pull request](#after-you-open-the-pull-request)
7. [Keeping your fork up to date](#keeping-your-fork-up-to-date)
8. [Your next change](#your-next-change)
9. [When something goes wrong](#when-something-goes-wrong)
10. [The short version](#the-short-version)

## How it works

You can't change the project directly. Instead, you:

1. **Fork** it: GitHub makes your own copy under your account.
2. Make your change in **your copy**, on a **branch** of its own.
3. Open a **pull request** asking for your change to be added to the `main` branch of the original project.
4. The maintainer reviews it, may ask for changes, and **merges** it.
5. Cloudflare Pages rebuilds the site, and your change is live a few minutes later.

```
jpdevdotcom/better-catarman-northsamar   (the original, "upstream")
        │
        │  1. Fork
        ▼
your-username/better-catarman-northsamar   (your copy, "origin")
        │
        │  2. Make a branch and commit your change
        │  3. Open a pull request: your branch → upstream main
        ▼
jpdevdotcom/better-catarman-northsamar  main
        │
        │  4. Reviewed and merged
        │  5. Deployed to bettercatarman.org
```

Your pull request always goes **from a branch in your fork to `main` in the original project.**

## Words you'll see

| Word | What it means |
| --- | --- |
| **Repository** (repo) | A project's folder of files, with its full history of changes. |
| **Fork** | Your own copy of someone else's repository, on your GitHub account. You can change it freely. |
| **Upstream** | The original repository you forked from: `jpdevdotcom/better-catarman-northsamar`. |
| **Origin** | Your fork, when you work on your computer. |
| **Clone** | Download a repository to your computer. |
| **Branch** | A separate line of work inside a repository. You make one for each change, so changes don't mix. |
| **`main`** | The main branch. What's on `main` in the upstream repository is what's on the live site. |
| **Commit** | A saved set of changes with a short message saying what you did. |
| **Push** | Upload your commits from your computer to your fork on GitHub. |
| **Pull request** (PR) | A request to add the commits on your branch to the upstream `main`. It's also where the review happens. |
| **Merge** | Add a pull request's changes to `main`. Only the maintainer can do this. |
| **Merge conflict** | When your change and someone else's both edit the same lines, and Git needs you to pick what to keep. |

## Choose a way

| | Way 1: In your browser | Way 2: On your computer |
| --- | --- | --- |
| Good for | A typo, a wrong phone number, a translation, a fix to one file | Code, design, several files, anything you want to see working before you send it |
| You need | A GitHub account | A GitHub account, Git, Node.js, pnpm and a code editor |
| Can you preview the site? | No | Yes |
| Time to set up | None | About 20 minutes the first time |

If you're not sure, start with Way 1. You can always switch later.

## Way 1: Edit in your browser

You don't need to install anything. GitHub forks the project for you when you start editing.

### 1. Create a GitHub account

If you don't have one, sign up at [github.com/signup](https://github.com/signup). It's free.

### 2. Find the file

Go to [github.com/jpdevdotcom/better-catarman-northsamar](https://github.com/jpdevdotcom/better-catarman-northsamar) and open the file you want to change. Some common ones:

| To change | Open |
| --- | --- |
| Hotlines, FAQ, office hours, municipal facts | [`app/data/site.ts`](../app/data/site.ts) |
| A service's requirements or steps | [`app/data/services.ts`](../app/data/services.ts) |
| Government officials and offices | the files in [`app/data/`](../app/data/) |
| Filipino translations | [`app/i18n/fil.ts`](../app/i18n/fil.ts) |
| Waray translations | [`app/i18n/war.ts`](../app/i18n/war.ts) |
| The text of a page | the page's file in [`app/pages/`](../app/pages/) |

Not sure which file? Press `t` on the repository page to search file names, or press `/` to search the code for a word you see on the site.

> Don't edit `barangays.ts`, `boundaries.ts`, `facilities.ts` or `barangayOfficials.ts` in `app/data/`. They are generated by scripts. If one of them is wrong, [open an issue](https://github.com/jpdevdotcom/better-catarman-northsamar/issues/new/choose) instead.

### 3. Start editing

Click the **pencil icon** (Edit this file) at the top right of the file.

GitHub says you need to fork the repository to make changes. Click **Fork this repository**. This makes your copy and opens the file in the editor.

### 4. Make your change

Change only what you need to. Keep the quotes, commas and indentation as they are around your change. For example, in a translation file each line looks like this:

```ts
'Services': 'Mga Serbisyo',
```

The left side is the English text and must stay the same. Change only the right side, and keep the quote marks and the comma at the end.

Click the **Preview** tab to see what you changed. Changed lines are highlighted.

### 5. Save your change as a commit

Click **Commit changes…**. In the box that opens:

- **Commit message:** say what you changed, in a short sentence. For example: `Correct the MDRRMO hotline number`.
- **Extended description:** say where you found the correct information.

Click **Propose changes**. GitHub saves the commit on a new branch in your fork, with a name like `patch-1`.

### 6. Open the pull request

GitHub now shows **Comparing changes**. Check the line at the top:

```
base repository: jpdevdotcom/better-catarman-northsamar   base: main
head repository: your-username/better-catarman-northsamar   compare: patch-1
```

Click **Create pull request**. Then fill in the form (see [Writing the pull request](#writing-the-pull-request)) and click **Create pull request** again.

That's it. Skip to [After you open the pull request](#after-you-open-the-pull-request).

## Way 2: Work on your computer

### 1. Install the tools

You need these once. If you already have them, skip to the next step.

| Tool | What it's for | Get it |
| --- | --- | --- |
| **Git** | Tracks your changes and sends them to GitHub | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **Node.js 22 or later** | Runs the site on your computer | [nodejs.org](https://nodejs.org). Choose the LTS version. |
| **pnpm** | Installs the packages the site uses | After Node.js, run `npm install -g pnpm` |
| **A code editor** | For editing the files | [Visual Studio Code](https://code.visualstudio.com) is free and works well |

On Windows, use **Git Bash** (installed with Git) for the commands in this guide. On Mac, use **Terminal**. On Linux, use your usual terminal.

Install pnpm after Node.js:

```bash
npm install -g pnpm
```

Check that everything is installed. Each command prints a version number:

```bash
git --version
```

```bash
node --version
```

```bash
pnpm --version
```

`node --version` must show `v22` or higher. If a command says "not found", close the terminal, open a new one and try again. If it still fails, reinstall that tool.

### 2. Tell Git who you are

Git puts your name and email on every commit. Do this once per computer:

```bash
git config --global user.name "Your Name"
```

```bash
git config --global user.email "you@example.com"
```

Use the email of your GitHub account so GitHub links the commits to you. If you'd rather keep your email private, use the `noreply` address GitHub gives you in **Settings → Emails** (turn on **Keep my email addresses private**). It looks like `12345678+your-username@users.noreply.github.com`.

### 3. Fork the repository

1. Sign in to GitHub and go to [github.com/jpdevdotcom/better-catarman-northsamar](https://github.com/jpdevdotcom/better-catarman-northsamar).
2. Click **Fork** at the top right.
3. Leave the settings as they are, with **Copy the `main` branch only** ticked, and click **Create fork**.

You now have `github.com/your-username/better-catarman-northsamar`.

### 4. Clone your fork

Download **your fork**, not the original. On your fork's page, click the green **Code** button, choose **HTTPS** and copy the address. Then, in your terminal, go to the folder where you keep projects and run:

```bash
git clone https://github.com/your-username/better-catarman-northsamar.git
```

Replace `your-username` with your GitHub username. This makes a folder called `better-catarman-northsamar`. Go into it:

```bash
cd better-catarman-northsamar
```

All the other commands in this guide are run inside this folder.

> The first time you push, Git asks you to sign in to GitHub. A browser window may open, or Git may ask for a password. GitHub doesn't accept your account password here. Sign in through the browser window, or install the [GitHub CLI](https://cli.github.com) and run `gh auth login` once.

### 5. Connect your copy to the original

Your clone knows about your fork, which Git calls `origin`. Tell it about the original project too, so you can get the latest changes later. Git calls this one `upstream`:

```bash
git remote add upstream https://github.com/jpdevdotcom/better-catarman-northsamar.git
```

Check both are there:

```bash
git remote -v
```

You should see four lines:

```
origin    https://github.com/your-username/better-catarman-northsamar.git (fetch)
origin    https://github.com/your-username/better-catarman-northsamar.git (push)
upstream  https://github.com/jpdevdotcom/better-catarman-northsamar.git (fetch)
upstream  https://github.com/jpdevdotcom/better-catarman-northsamar.git (push)
```

You only push to `origin`. You can't push to `upstream`, and you don't need to.

### 6. Install and run the site

Install the packages. This takes a minute or two the first time:

```bash
pnpm install
```

Make your own settings file from the example:

```bash
cp .env.example .env
```

You can leave the values in `.env` empty. The site works without them; the maps and the correction email just won't be set up. Never commit `.env`. It's already left out by `.gitignore`.

Start the site:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. When you save a file, the page updates by itself. To stop the site, click in the terminal and press `Ctrl` + `C`.

Leave it running in one terminal window and open a second one for the Git commands below.

### 7. Make a branch for your change

Never work directly on `main`. Make a new branch for each change, named after what you're doing:

```bash
git switch -c fix-mdrrmo-hotline
```

| Part | What it does |
| --- | --- |
| `git switch` | Moves you to a branch |
| `-c` | Creates the branch first |
| `fix-mdrrmo-hotline` | The branch name. Use lowercase words joined by dashes. |

Some name ideas: `fix-typo-faq`, `translate-services-waray`, `add-2026-audit`, `fix-menu-on-phones`.

### 8. Make your change

Open the folder in your editor and make your change. See [Where things are in CONTRIBUTING.md](../CONTRIBUTING.md#where-things-are) to find the right file.

Check it in your browser at [http://localhost:3000](http://localhost:3000), in a desktop-sized window and a phone-sized one. In most browsers you can open the developer tools (`F12`) and turn on the device toolbar to see a phone-sized view.

### 9. Check that it builds

Before you send your change, run the same checks the maintainer will. First, the type check, which catches many code mistakes:

```bash
pnpm typecheck
```

Then build the whole site the way the live site is built:

```bash
pnpm generate
```

Both must finish without errors. If one fails, read the first error it prints: it names the file and line. If you're stuck, open your pull request anyway and say what failed. Someone will help.

### 10. Commit your change

See what you changed:

```bash
git status
```

Files in red are changed but not yet added to the commit. Check the changes line by line:

```bash
git diff
```

Press `q` to leave the view. If you see a file you didn't mean to change, undo it with `git restore path/to/file`.

Add the files you changed. Name each file, rather than adding everything:

```bash
git add app/data/site.ts
```

Save them as a commit, with a message saying what you did:

```bash
git commit -m "Correct the MDRRMO hotline number"
```

A good commit message:

- says what the change does, as a short sentence: `Add the Waray translation of the services page`
- starts with a capital letter, with no full stop at the end
- is about one thing. If you made two separate changes, make two commits.

### 11. Push your branch to your fork

```bash
git push -u origin fix-mdrrmo-hotline
```

| Part | What it does |
| --- | --- |
| `git push` | Uploads your commits |
| `-u` | Remembers where this branch goes, so next time `git push` alone is enough |
| `origin` | Your fork |
| `fix-mdrrmo-hotline` | Your branch |

### 12. Open the pull request

Go to your fork on GitHub. A yellow box says your branch had recent pushes. Click **Compare & pull request**.

If you don't see the box, go to the original project's [Pull requests](https://github.com/jpdevdotcom/better-catarman-northsamar/pulls) tab, click **New pull request**, then **compare across forks**.

Check the line at the top. It must read:

```
base repository: jpdevdotcom/better-catarman-northsamar   base: main
head repository: your-username/better-catarman-northsamar   compare: fix-mdrrmo-hotline
```

- **base** is where your change goes: always `jpdevdotcom/better-catarman-northsamar` and `main`.
- **head** is where it comes from: your fork and your branch.

Fill in the form (see the next section). Make sure **Allow edits by maintainers** is ticked, so the maintainer can fix a small thing for you instead of asking. Click **Create pull request**.

### Writing the pull request

The form is already filled in with a template. Replace the comments with your answers:

| Section | What to write |
| --- | --- |
| **Title** | What the change does, like a commit message: `Correct the MDRRMO hotline number` |
| **What this changes** | One or two sentences. If it fixes an issue, write `Fixes #12` with the issue's number, and the issue closes when your change is merged. |
| **Why** | What was wrong or missing, and who it helps |
| **Type of change** | Tick one box by changing `[ ]` to `[x]` |
| **Sources** | A link for every fact you added or changed. Write `None` for code-only changes. |
| **Screenshots** | For anything visible: drag images into the box, before and after, on a phone and a desktop |
| **Checklist** | Tick what you did. If you couldn't do something, leave it unticked and say why. |

It's fine to open a pull request before it's finished. Choose **Create draft pull request** from the arrow next to the button, and click **Ready for review** when you're done.

## After you open the pull request

- **The maintainer reviews it.** You'll get a GitHub notification when there's a comment. This can take a few days, since everyone here is a volunteer.
- **You may be asked for changes.** That's normal and not a rejection. Make the changes on the same branch, then commit and push again:

  ```bash
  git add app/data/site.ts
  ```

  ```bash
  git commit -m "Use the number from the MDRRMO poster"
  ```

  ```bash
  git push
  ```

  The pull request updates by itself. Don't open a new one. When you've dealt with a comment, reply to it or click **Resolve conversation**.

- **When it's merged**, your change is on the site after the next deployment, usually within a few minutes. You can delete your branch with the **Delete branch** button on the pull request.
- **If it's closed without merging**, the maintainer will say why. Sometimes the information can't be confirmed yet, or someone else already fixed it.

## Keeping your fork up to date

Your fork doesn't update by itself when the original project changes. Update it before you start each new change, so you work on the latest version.

**On GitHub:** go to your fork and click **Sync fork**, then **Update branch**.

**On your computer:** switch to your `main` branch:

```bash
git switch main
```

Download the latest changes from the original project:

```bash
git fetch upstream
```

Move your `main` to match it:

```bash
git merge --ff-only upstream/main
```

Update your fork on GitHub too:

```bash
git push origin main
```

Then install any new packages:

```bash
pnpm install
```

| Command | What it does |
| --- | --- |
| `git switch main` | Moves you to your `main` branch |
| `git fetch upstream` | Downloads new commits from the original project, without changing your files yet |
| `git merge --ff-only upstream/main` | Moves your `main` forward to match the original. `--ff-only` stops if your `main` has commits of its own, so nothing gets mixed up. |
| `git push origin main` | Updates your fork's `main` on GitHub |
| `pnpm install` | Installs any packages that were added since you last updated |

If `git merge --ff-only` says it can't fast-forward, you made commits on `main` by mistake. See [I committed to `main` by mistake](#i-committed-to-main-by-mistake).

### Updating a branch while its pull request is open

If `main` has moved on while your pull request is waiting, GitHub may show **This branch is out-of-date with the base branch**. Click **Update branch** on the pull request. Then, on your computer, get that update before you make more changes:

```bash
git pull
```

## Your next change

You only fork, clone and add `upstream` once. For every change after that:

1. [Update your fork](#keeping-your-fork-up-to-date).
2. Make a new branch from the updated `main`: `git switch -c your-new-branch`.
3. Make your change, run `pnpm typecheck` and `pnpm generate`, commit and push.
4. Open a new pull request.

Keep one change per branch, and one branch per pull request.

## When something goes wrong

### `Permission denied` or `403` when I push

You're pushing to the original project instead of your fork. Check where `origin` points:

```bash
git remote -v
```

If `origin` shows `jpdevdotcom/...`, you cloned the original instead of your fork. Point `origin` at your fork, and keep the original as `upstream`:

```bash
git remote rename origin upstream
```

```bash
git remote add origin https://github.com/your-username/better-catarman-northsamar.git
```

Then push again with `git push -u origin your-branch-name`.

If `origin` already points at your fork, Git isn't signed in as you. Sign in again through the browser window when it asks, or run `gh auth login` if you use the GitHub CLI.

### I committed to `main` by mistake

Move the commits to a new branch, then put `main` back the way it was. Make a branch where you are now. This keeps your commits:

```bash
git switch -c my-change
```

Go back to `main`:

```bash
git switch main
```

Reset `main` to match the original project. Your commits are safe on `my-change`:

```bash
git fetch upstream
```

```bash
git reset --hard upstream/main
```

Then go back to your branch and carry on:

```bash
git switch my-change
```

> `git reset --hard` throws away changes on the branch you're on that aren't committed. Only run it on `main`, after making the new branch.

### My pull request has a merge conflict

GitHub says **This branch has conflicts that must be resolved**. Someone else changed the same lines as you. For a small conflict, click **Resolve conflicts** on the pull request. GitHub shows the lines between markers:

```
<<<<<<< your-branch
your version of the lines
=======
the version on main
>>>>>>> main
```

Edit the text to what it should be, delete the three marker lines, click **Mark as resolved**, then **Commit merge**. If it looks confusing, leave a comment on the pull request and ask for help.

### `pnpm: command not found`

Install it with `npm install -g pnpm`, then open a new terminal window. If `npm` is also not found, Node.js isn't installed or the terminal was opened before you installed it.

### `pnpm install` or `pnpm dev` fails with strange errors

Check `node --version`. The site needs Node.js 22 or later. Install the LTS version from [nodejs.org](https://nodejs.org), open a new terminal, and run `pnpm install` again.

### Port 3000 is already in use

Something else is using the address, often another `pnpm dev` you left running. Stop it with `Ctrl` + `C` in its window. Nuxt may also pick another port by itself; use the address it prints.

### I committed `.env` or a key by mistake

Don't push. If it's the last commit, take the file back out:

```bash
git rm --cached .env
```

```bash
git commit --amend --no-edit
```

If you already pushed a real key, tell the maintainer straight away by email at security@bettercatarman.org (see [SECURITY.md](../SECURITY.md)), and cancel the key with whoever issued it. Deleting the commit isn't enough, since others may already have copied it.

### I'm stuck

That's fine. Open your pull request as a draft, or [open an issue](https://github.com/jpdevdotcom/better-catarman-northsamar/issues/new/choose), and describe what you tried and what happened. Paste the error message as text, not just a screenshot.

## The short version

For people who have done this before. Run once:

```bash
git clone https://github.com/your-username/better-catarman-northsamar.git
```

```bash
cd better-catarman-northsamar
```

```bash
git remote add upstream https://github.com/jpdevdotcom/better-catarman-northsamar.git
```

```bash
pnpm install
```

For each change:

```bash
git switch main
```

```bash
git fetch upstream
```

```bash
git merge --ff-only upstream/main
```

```bash
git switch -c your-branch
```

Make your change, then:

```bash
pnpm typecheck
```

```bash
pnpm generate
```

```bash
git add path/to/changed/files
```

```bash
git commit -m "Say what the change does"
```

```bash
git push -u origin your-branch
```

Open a pull request from `your-username:your-branch` to `jpdevdotcom/better-catarman-northsamar:main`, fill in the template and tick **Allow edits by maintainers**.

Thank you for helping make public information in Catarman easier to find.
