# Contributing to BetterCatarman.org

Thank you for helping. BetterCatarman.org is run by volunteers as a contribution to the BetterGov.ph initiative. Residents use it to decide what to bring to an office or who to call, so accuracy matters more than anything else here.

You don't need to know how to code to help. Corrections and translations are just as valuable as code.

**New to pull requests?** [Your first pull request](FIRST-PULL-REQUEST.md) shows how to clone the project, make your change and send it for review.

Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to help

- **Report a mistake.** Use **Report a correction** at the bottom of any page, or [open an issue](https://github.com/jpdevdotcom/better-catarman-northsamar/issues). Say what is wrong, what it should say, and where you saw the correct information.
- **Improve a translation.** The Waray text is a first draft that no native speaker has reviewed yet. Reviews of the Filipino text are welcome too.
- **Add a source.** A newer audit report, an official checklist or an office's updated contact details.
- **Fix a bug or improve the site.** Open an issue first for anything larger than a small fix, so we can agree on it before you spend time.

## The rules for content

These rules apply to every fact on the site, whether it comes from a pull request or a correction report.

1. **Every fact needs a source.** Link to where you found it, preferably the original document or page. Add any new source to [`app/data/sources.ts`](app/data/sources.ts), with what it was used for.
2. **Use Catarman's own published information first.** If Catarman hasn't published something, use the national law or agency guideline and say so. If there is no source at all, label it as general guidance.
3. **If a fact can't be confirmed, leave it blank.** A missing phone number shows "N/A". Never guess a number, name, fee or date.
4. **Don't change quoted text.** Audit observations, the municipality's replies and official requirements are quoted word for word, and stay in English as published.
5. **Keep it neutral.** The site reports what the sources say. It doesn't praise or criticise officials, parties or candidates.
6. **Don't add personal information** beyond what an official source already publishes for a public office.
7. **Say when you changed something by hand.** If you adjust or combine published data, explain how in `handEdits` in `app/data/sources.ts`.

## Translations

Translations live in [`app/i18n/fil.ts`](app/i18n/fil.ts) (Filipino) and [`app/i18n/war.ts`](app/i18n/war.ts) (Waray). Each entry is keyed by the English text on the page:

```ts
'Services': 'Mga Serbisyo',
```

Any text without an entry is shown in English. If you change an English string in a page, update its key in both files too.

Please say in your pull request whether you are a native speaker. Once a native speaker has reviewed the Waray file, we can remove its "needs review" note and its "beta" label.

## Working on the code

### Setup

You need Node.js 22 or later, [pnpm](https://pnpm.io) and Git. New to pull requests? [Your first pull request](FIRST-PULL-REQUEST.md) explains each step in more detail.

Clone the repository and go into its folder:

```bash
git clone https://github.com/jpdevdotcom/better-catarman-northsamar.git
```

```bash
cd better-catarman-northsamar
```

Install the packages and make your own settings file. The values in `.env` can stay empty; maps and the report email just won't be set up (see the [README](README.md#running-it-locally)):

```bash
pnpm install
```

```bash
cp .env.example .env
```

Start the site at [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

Make a branch for your change. Don't work on `main`:

```bash
git switch -c fix-mdrrmo-hotline
```

### Where things are

| Folder | What's in it |
| --- | --- |
| `app/pages/` | One file per page |
| `app/components/` | Shared components. `ui/` holds the shadcn-vue components |
| `app/data/` | The site's content: services, barangays, officials, finances and sources |
| `app/i18n/` | Filipino and Waray translations |
| `data-sources/` | Raw files the scripts turn into `app/data/` |
| `scripts/` | Data build scripts and the sitemap generator |

Some files in `app/data/` are generated: `barangays.ts`, `boundaries.ts`, `facilities.ts` and `barangayOfficials.ts`. Don't edit them by hand. Update the file in `data-sources/` or the script in `scripts/`, then rerun the script (see the [README](README.md#rebuilding-the-data)).

### Design

Keep to the site's look: **white and blue, no shadows, no rounded corners, minimal.** Use the existing components and Tailwind theme colors instead of new colors. Write in plain, short sentences for residents, not officials.

The site must stay usable on a cheap phone and a slow connection, and with a keyboard or screen reader. Use real headings, labels and link text.

### Before you open a pull request

Make sure the type check passes:

```bash
pnpm typecheck
```

Then make sure the static build works:

```bash
pnpm generate
```

Then:

- Check your change in the browser on both a phone-sized and a desktop-sized window.
- Keep each pull request to one change, and describe what changed and why.
- For a notable change, add a line under **Unreleased** in [CHANGELOG.md](CHANGELOG.md).
- For any content change, link the source.
- Never commit `.env`, API keys, or the downloaded COA PDFs and zips. `.gitignore` already leaves these out.

### Sending your pull request

Commit your change with a short sentence saying what it does:

```bash
git add path/to/changed/file
```

```bash
git commit -m "Correct the MDRRMO hotline number"
```

Only the maintainer can push to this repository, so your branch goes to your own fork. The [GitHub CLI](https://cli.github.com) does this for you. Sign in once with `gh auth login`, then run:

```bash
gh pr create --base main
```

When it asks where to push, choose to create a fork. It pushes your branch to the fork and opens a pull request to `main`. Without the GitHub CLI, see [Push and open a pull request](FIRST-PULL-REQUEST.md#6-push-and-open-a-pull-request).

Fill in the pull request template and leave **Allow edits by maintainers** ticked. The maintainer reviews every pull request before it's merged. If you're asked for changes, commit them on the same branch and run `git push`; the pull request updates by itself.

Before your next change, update `main` and make a new branch:

```bash
git switch main
```

```bash
git pull origin main
```

## License

By contributing, you agree that your code contributions are released under the [MIT License](LICENSE). Data keeps the licence of its source.
