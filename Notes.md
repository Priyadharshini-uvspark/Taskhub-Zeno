DAY 1 — M1: GIT PRACTICE NOTES

1. Git Branch
git branch — Shows all the branches in my repository.
git switch -c m1-git-practice — Creates a new branch and switches to it.
git switch branch-name — Switches to an existing branch.

2. Git Commits
git status — Shows my current branch and the status of my files.
git add filename — Selects a file's changes for the next commit.
git commit -m "message" — Saves the staged changes as a commit.
git log --oneline — Shows the commit history in a short format.

3. Push and Pull Request
git push -u origin m1-git-practice — Uploads my branch and its commits to GitHub.
A pull request (PR) allows me to propose my changes for review before merging them into another branch.

4. Merge Conflict
A merge conflict happens when Git cannot automatically combine changes from different branches.
I created two branches and changed the same file differently to practise a merge conflict.
I resolved the conflict by editing the file and choosing the final content I wanted to keep.
git add conflict.txt — Stages the resolved file.
git merge conflict-a — Merges the changes from conflict-a into my current branch.

5. Git Stash
git stash — Temporarily saves my uncommitted changes and removes them from my working directory.
git stash pop — Restores my stashed changes and removes the stash entry if it applies successfully.

6. Git Reset Soft
git reset --soft HEAD~1 — Moves my current branch back by one commit while keeping the changes staged.

7. Git Revert
git revert commit-id — Creates a new commit that reverses the changes from an earlier commit. The original commit remains in the history.

8. Git Log Graph
git log --oneline --graph — Shows commit history in a short format and displays a graph of branches and merges.

9. What I Learned
A branch allows me to work separately from another branch.
A commit saves a checkpoint of my changes.
A pull request allows others to review my changes before merging.
A merge conflict happens when Git cannot automatically combine changes, so I must resolve it.
Stash temporarily puts uncommitted changes aside.
Reset soft moves the branch pointer but keeps changes staged.
Revert undoes changes by creating a new commit.
Git log helps me understand my project's commit history.