## NOTE: This project is deprecated, it should be re-built as a globally executable node command line app


# github_scripts
Convenience scripts to delete / create repo locally + on github, from command line, using github api.

## Commands

### Create new github repo from master branch of existing local one
node repo.js create \<newrepo_name\> \<local_directory_containing_repo\>

### Delete an existing repo ( both locally + on github )
node repo.js delete \<reponame\> \<local_repo_path\> --user \<username\>

( if using token for authentication, you'll need to provide --user param )

## Authentication

### Use username / password
This is the default, it will prompt you

### Use auth token
To avoid typing in password every time, generate an auth token:
https://help.github.com/articles/creating-an-access-token-for-command-line-use/

Put this token in token.txt, it will be read and used if it exists.
