# github_scripts
Convenience scripts to delete / create repo locally + on github, from command line, using github api.

## Commands

### Create new github repo from master branch of existing local one
node repo.js -c create \<newrepo\> \<oldrepo_path\>

### Delete an existing repo
node repo.js -c delete \<reponame\> \<repo_path\>
