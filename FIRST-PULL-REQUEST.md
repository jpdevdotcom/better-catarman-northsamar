# Your first pull request

How to send a change to BetterCatarman.org. Before you change any facts, read the [content rules](CONTRIBUTING.md#the-rules-for-content): **every fact needs a source.**

## What you need

- A [GitHub account](https://github.com/signup)
- [Git](https://git-scm.com/downloads)
- [Node.js 22 or later](https://nodejs.org)
- [pnpm](https://pnpm.io), installed with `npm install -g pnpm`

## 1. Clone the project

```bash
git clone https://github.com/jpdevdotcom/better-catarman-northsamar.git
```

```bash
cd better-catarman-northsamar
```

## 2. Install and run it

```bash
pnpm install
```

```bash
cp .env.example .env
```

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The values in `.env` can stay empty; the maps and the correction email just won't be set up. Never commit `.env`.

## 3. Make a branch

Don't work on `main`. Make a branch for each change:

```bash
git switch -c fix-mdrrmo-hotline
```

`fix-mdrrmo-hotline` is only an example. Name the branch whatever you like, ideally a few words about your change joined by dashes, such as `translate-faq-waray` or `fix-menu-on-phones`.

## 4. Make your change and check it

See [Where things are](CONTRIBUTING.md#where-things-are) to find the right file. Check your change in a phone-sized and a desktop-sized window, then make sure both of these pass:

```bash
pnpm typecheck
```

```bash
pnpm generate
```

## 5. Commit

```bash
git add path/to/changed/file
```

```bash
git commit -m "Correct the MDRRMO hotline number"
```

Write the message as a short sentence saying what the change does.

## 6. Push and open a pull request

Only the maintainer can push to this repository, so your branch goes to your own copy (a fork) on GitHub. The easiest way is the [GitHub CLI](https://cli.github.com). Sign in once with `gh auth login`, then run:

```bash
gh pr create --base main
```

It offers to fork the repository for you, pushes your branch there and opens the pull request to `main`. Choose to fork when it asks.

<details>
<summary>Without the GitHub CLI</summary>

1. On [the repository page](https://github.com/jpdevdotcom/better-catarman-northsamar), click **Fork**, then **Create fork**.
2. Add your fork as a remote, replacing `your-username`:

   ```bash
   git remote add fork https://github.com/your-username/better-catarman-northsamar.git
   ```

3. Push your branch to it:

   ```bash
   git push -u fork fix-mdrrmo-hotline
   ```

4. Open your fork on GitHub and click **Compare & pull request**. Check that the base is `jpdevdotcom/better-catarman-northsamar` and `main`.

</details>

Fill in the pull request template, link a source for every fact, and leave **Allow edits by maintainers** ticked.

## 7. After you open it

The maintainer reviews every pull request and may ask for changes. Make them on the same branch, commit, and run `git push`. The pull request updates by itself, so don't open a new one. Once it's merged, the change is live after the next deployment.

## Your next change

Start from the latest `main`:

```bash
git switch main
```

```bash
git pull origin main
```

```bash
git switch -c your-next-branch
```

## Only fixing a typo?

You don't need to clone. Open the file on GitHub, click the pencil icon, make the change and click **Propose changes**. GitHub makes the fork and the pull request for you.

Stuck? Open a draft pull request or an [issue](https://github.com/jpdevdotcom/better-catarman-northsamar/issues/new/choose) and describe what happened.
