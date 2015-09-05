# github_scripts
Convenience scripts to delete / create repo locally + on github, from command line, using github api.

## Commands

### Create new github repo from master branch of existing local one
node repo.js create \<newrepo_name\> \<local_repo_to_copy\>

### Delete an existing repo ( both locally + on github )
node repo.js delete \<reponame\> \<local_repo_path\>
