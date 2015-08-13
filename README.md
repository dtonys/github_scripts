# github_scripts
Convenience scripts to delete / create repo locally + on github, from command line, using github api.

## Commands

### Create new local + github repo from master branch of existing local repo
node repo.js -c create \<newrepo\> \<oldrepo_path\> -u \<username\> -p \<password\>

### Delete an existing repo on local + github
node repo.js -c delete \<reponame\> -u \<username\> -p \<password\>
