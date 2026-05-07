# Hosting on GitHub Pages with CI/CD

This guide walks you through hosting your portfolio on GitHub Pages and setting up the CI/CD pipeline using GitHub Actions — from zero to a live URL.

---

## Prerequisites

- A GitHub account
- Git installed on your machine
- Your portfolio code (this repo)

---

## Step 1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it exactly **`Portfolio`** (keeps the URL clean)
3. Set visibility to **Public** *(required for free GitHub Pages)*
4. **Do not** initialise with a README — you already have one
5. Click **Create repository**

---

## Step 2 — Push Your Code

Open a terminal in your portfolio folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SUDEEP-M-SHETTY/Portfolio.git
git push -u origin main
```

> Replace `SUDEEP-M-SHETTY` with your actual GitHub username if different.

---

## Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings → Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

That's it — GitHub Pages is now configured to receive deployments from Actions.

---

## Step 4 — Understand the CI/CD Pipeline

The workflow lives at `.github/workflows/static.yml` and runs automatically on every push to `main`.

```
Push to main
     │
     ▼
┌─────────────────────┐
│  Job 1: Lint &      │  ← Runs on every push AND pull request
│  Validate           │
│  • HTML lint        │
│  • CSS lint         │
│  • Broken link check│
└────────┬────────────┘
         │  passes?
         ▼
┌─────────────────────┐
│  Job 2: Deploy      │  ← Runs only on push to main (not PRs)
│  • Upload artifact  │
│  • Deploy to Pages  │
│  • Print live URL   │
└─────────────────────┘
```

### What each job does

| Job | Trigger | Purpose |
|-----|---------|---------|
| **lint-and-validate** | Every push & PR | Catches HTML errors, CSS issues, broken internal anchor links before anything goes live |
| **deploy** | Push to `main` only | Uploads the site and deploys it to GitHub Pages |

### Pull Request safety net

If you work on a feature branch and open a PR, the **lint job runs but deploy does not**. Your live site stays untouched until the PR is reviewed and merged into `main`.

---

## Step 5 — Verify the Deployment

1. Go to your repository → **Actions** tab
2. You should see the workflow **"CI/CD — Build, Validate & Deploy to GitHub Pages"** running
3. Once both jobs show a green ✅, click the **deploy** job
4. The last step **"Print deployed URL"** shows your live link

Your portfolio will be live at:

```
https://SUDEEP-M-SHETTY.github.io/Portfolio/
```

---

## Day-to-Day Workflow

### Making changes

```bash
# Make your edits, then:
git add .
git commit -m "Update skills section"
git push origin main
```

The pipeline triggers automatically — lint runs, then deploy. Changes are live in ~60 seconds.

### Working on a feature safely

```bash
git checkout -b update-certifications
# make your changes
git add .
git commit -m "Add AZ-104 cert"
git push origin update-certifications
# Open a Pull Request on GitHub
# Lint runs automatically on the PR
# Merge to main → deploy triggers
```

---

## Troubleshooting

### Workflow not triggering
- Confirm the file is at `.github/workflows/static.yml`
- Check the branch name is `main` (not `master`)

### HTML lint failing
- Open the **Actions** tab, click the failed run, expand **"Lint HTML"**
- Fix the reported issues in `index.html` and push again

### CSS lint failing
- Expand **"Lint CSS"** in the failed run for the exact rule and line number
- Common fixes: remove trailing spaces, fix unknown properties

### Pages shows 404
- Go to **Settings → Pages** and confirm Source is set to **GitHub Actions** (not a branch)
- Make sure the deploy job completed successfully with a green tick

### Site not updating after push
- GitHub Pages has a CDN cache — hard refresh with `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- If still stale, wait 1–2 minutes and try again

---

## File Reference

```
Portfolio/
├── .github/
│   └── workflows/
│       └── static.yml      ← CI/CD pipeline definition
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
│   └── version.js
├── .htmlhintrc              ← HTML linting rules
├── .stylelintrc.json        ← CSS linting rules
├── index.html
├── README.md
└── DEPLOYMENT.md            ← This file
```
