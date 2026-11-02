# Website patching and release guide

Website: https://elliotweir.co.uk  
Repository: https://github.com/0xW0lf/elliotweir-site  
Default and live branch: `main`  
Development branch: `dev`

Use your normal local clone of the repository. Run the commands below from its root folder. These are instructions: dependencies have not been patched by adding this guide.

## 1. Configure alerts and email

Open the repository on GitHub, then Settings and its security settings (the section may be called Advanced Security or Code security).

Enable or confirm:

- Dependency graph.
- Dependabot alerts.
- Dependabot security updates, if you want automatic security-fix proposals as well as regular version updates.

The committed `.github/dependabot.yml` configures regular npm version-update proposals every Monday around 09:00 UK time. It must exist on the default branch, `main`. Version-update pull requests target `dev`, with up to five open at once. It does not enable automatic merging or deployment.

Security alerts examine the default branch. Security-update pull requests normally target the default branch too; setting `target-branch: dev` for regular version updates does not redirect those security fixes. Check the base branch on every pull request. For a security fix proposed against `main`, test the proposed branch first and bring the equivalent fix through `dev` before publishing. Do not assume every proposal is safe merely because it comes from Dependabot.

### Will GitHub email me?

Yes, when your subscriptions and email settings allow it. Adding the configuration file alone does not guarantee email delivery or change your notification address.

1. Open https://github.com/settings/notifications.
2. Enable email delivery for watched repository activity and Dependabot security alerts. Choose a digest too if useful.
3. In the repository, open Watch, then Custom, and include Security alerts and Pull requests (or select All Activity).
4. Check your GitHub email settings and notification routing. Select your verified `elliot@elliotweir.co.uk` address if you want messages there; verify it first if it is not listed.
5. Open the repository's Security tab and review existing Dependabot alerts directly. Initial enablement does not necessarily email every existing finding.
6. Look for the first Dependabot pull request and check your GitHub notification inbox and email spam folder. A weekly check with no proposed changes need not produce an email.

Your personal notification preferences and repository security toggles have not been verified or changed by committing this configuration.

## 2. Start with a clean, current development branch

```bash
git status
git fetch origin
git switch dev
git pull --ff-only origin dev
```

If `git status` shows work you have not finished, save or commit it before switching branches. If a fast-forward fails, inspect the divergence before proceeding. Do not force-push or discard files to get past it.

Create a patch branch:

```bash
git switch -c maintenance/dependency-patches
```

Use a fresh branch name for each maintenance round if that name already exists.

## 3. Record the findings

```bash
npm ci
npm audit
npm outdated
```

Read the affected version, fixed version, release notes and exploit conditions. Separate build/development exposure from code actually running on the public site. This repository builds static files; an audit finding does not automatically prove a remotely exploitable live-site flaw.

`npm audit` and `npm outdated` can return a non-zero exit code when they find something. Read the output rather than treating it as an unexplained tool failure.

## 4. Apply patches

### Option A: Test a Dependabot proposal

Open its GitHub pull request, read the changes and confirm the base is `dev`. Use the checkout commands shown by GitHub for that specific proposal, or GitHub CLI if configured:

```bash
gh pr checkout PR_NUMBER
npm ci
```

Replace `PR_NUMBER` with the real number. Check the diff and run the tests in the next section. After successful review, merge the pull request into `dev` using GitHub. Do not merge directly to `main` as a substitute for testing.

### Option B: Make the update yourself

For ordinary compatible updates within the ranges in `package.json`:

```bash
npm update
npm audit
```

For a remaining vulnerability, investigate its dependency chain and choose a reviewed package version or parent-package update. `npm audit fix` may help, but inspect every resulting change. Avoid `npm audit fix --force`; it can introduce incompatible versions or downgrades.

```bash
git diff -- package.json package-lock.json
```

Keep `package.json` and `package-lock.json` together. Do not delete the lockfile just to make an audit warning disappear. Major upgrades need their migration notes and additional testing.

## 5. Test the proposed version

Stop an existing background development server before a build:

```bash
npm run dev -- stop
npm ci
npm audit
npm run build
npm run preview
```

If your preview server is running in a terminal, stop it with Ctrl+C before starting another. Open the URL printed by preview; do not assume the port. Stop the preview with Ctrl+C when finished.

There is currently no `npm test` script. A successful build is useful, but it does not prove all browser tools work.

Checklist:

- [ ] Homepage, navigation, research, Atlas and certifications load.
- [ ] Conditional Access and Defender write-ups display correctly.
- [ ] Word and PDF CV downloads open.
- [ ] Domain lookup handles a public domain and invalid input.
- [ ] IP lookup handles a public IP and invalid input; map and error handling work.
- [ ] Guest-risk calculator handles normal values, zero, negatives and inactive counts exceeding the total.
- [ ] Mobile layout and keyboard navigation remain usable.
- [ ] Browser developer tools show no new console errors or failed requests.
- [ ] Remaining audit findings are recorded with an explanation.

## 6. Commit and push the manual patch for review

For a manual patch branch:

```bash
git diff --check
git diff -- package.json package-lock.json
git add package.json package-lock.json
git commit -m "Update dependencies and address security advisories"
git push -u origin maintenance/dependency-patches
```

If other files changed intentionally, review and add those exact files too. Create a GitHub pull request from the patch branch into `dev`, record the audit/build results and browser checks, then merge after review. Dependabot already creates its own pull requests, so do not duplicate one.

## 7. Publish the tested development version to main

First review what is about to go live:

```bash
git fetch origin
git switch dev
git pull --ff-only origin dev
git log --oneline origin/main..dev
git diff --stat origin/main..dev
```

Ensure this is the exact version tested, and that all changes in `dev` are intended for release. Record the current production commit for recovery:

```bash
git rev-parse origin/main
```

Then update local `main` and fast-forward it to the approved version:

```bash
git switch main
git pull --ff-only origin main
git merge --ff-only dev
git push origin main
```

If a fast-forward fails, stop and resolve the branch history before publishing. Never use `--force` for this process. If branch protection requires a pull request, create a release pull request from `dev` into `main` instead.

The site's current hosting setup deployed automatically after the previous push to `main`. Check the hosting deployment result every time; a successful Git push alone is not proof that the website is live.

## 8. Verify production

- [ ] Confirm the hosting build/deployment succeeded.
- [ ] Open https://elliotweir.co.uk and confirm the intended version appears.
- [ ] Repeat key page, tool and download checks.
- [ ] Check headers and HTTP-to-HTTPS redirection:

```bash
curl -I http://elliotweir.co.uk
curl -I https://elliotweir.co.uk
```

A ZAP baseline scan can provide additional checks:

```bash
docker run --rm -t ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t https://elliotweir.co.uk
```

Review findings; do not treat every warning as a confirmed exploit. The baseline crawls pages and applies passive checks, rather than running an active attack scan.

If deployment fails or introduces a serious regression, use the host's rollback to the recorded good deployment if available. Reconcile the Git history with a reviewed revert or forward fix afterwards; do not reset and force-push `main`.

Return to development when finished:

```bash
git switch dev
npm run dev -- --background
```

## Review record

- Date:
- Alerts and versions reviewed:
- Proposed and installed updates:
- Audit result before/after:
- Build result:
- Browser checks:
- Unresolved findings and reason:
- Previous production commit:
- New production commit:
- Deployment result:
- Next review:

## Official references

- Dependabot configuration: https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference
- GitHub security notifications: https://docs.github.com/en/subscriptions-and-notifications/how-tos/managing-security-notifications
- npm audit: https://docs.npmjs.com/cli/commands/npm-audit/
- ZAP baseline: https://www.zaproxy.org/docs/docker/baseline-scan/
