var child_process = require('child_process');
var GitApi = require("github");
var args = require('minimist')(process.argv.slice(2))

var github = new GitApi({
  version: "3.0.0",
});

switch( args['c'] ){
  case 'create': _create(); break;
  case 'delete': _delete(); break;
}

function _auth(){
  github.authenticate({
    type: "basic",
    username: args['u'],
    password: args['p']
  });
}

function _create(){
  _auth();

  var new_repo = args['_'][0];
  var existing_repo_path = args['_'][1];

  github.repos.create({ name: new_repo }, function(err, res){
    child_process.execSync('cd '+existing_repo_path+' && git push git@github.com:'+res.full_name+' +master:master');
    child_process.execSync('git clone '+res.html_url);
    console.log('created new repo "'+new_repo+'" from existing repo "'+existing_repo_path+'"\'s master branch');
  });

}

function _delete(){
  var existing_repo_name = args['_'][1];
  _auth();

  var existing_repo = args['_'][0];
  github.repos.delete({ user: args['u'], repo: existing_repo }, function(err, res){
    console.log('deleted repo "'+existing_repo+'"');
  });
}