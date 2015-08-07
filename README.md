# github_scripts
Convenience scripts to delete / create repo from command line

## Commands

### Create Repo from master branch of existing repo
node repo.js -c create <newrepo> <oldrepo_path> -u <username> -p <password>

### Delete an existing repo
node repo.js -c delete <reponame> -u <username> -p <password>
