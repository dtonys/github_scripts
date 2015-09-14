var child_process = require('child_process');
var fs = require('fs')
var GitApi = require("github");
var args = require('minimist')(process.argv.slice(2));
var prompt = require('prompt');

var github = new GitApi({
  version: "3.0.0",
});

main();

var username;

function main(){
  _auth( function(){
    switch( args['_'][0] ){
      case 'create': _create(); break;
      case 'delete': _delete(); break;
    }
  });
}

function _auth( cb ){
  var token;

  try{
    token = fs.readFileSync(__dirname+'/token.txt', 'utf8');
    useToken( token );
  }catch(e){
    console.log( e );
    usePassword();
  }

  function useToken( token ){
    github.authenticate({
      type: "oauth",
      token: token
    });
    cb();
  };

  function usePassword(){
    prompt.start();
    var schema = {
      properties: {
        username: {},
        password: {
          hidden: true
        }
      }
    };
    prompt.get(schema, function (err, result) {
      username = result.username;
      github.authenticate({
        type: "basic",
        username: result.username,
        password: result.password
      });
      cb();
    });
  }

}

function _create(){
  var new_repo = args['_'][1];
  var existing_repo_path = args['_'][2];
  var branch = args['b'] || 'master';

  // create new remote
  github.repos.create({ name: new_repo }, function(err, res){
    console.log( JSON.stringify( err ) );
    console.log( JSON.stringify( res ) );

    // push local branch to remote
    child_process.execSync('cd '+existing_repo_path+' && git push git@github.com:'+res.full_name+' +'+branch+':master');
    // delete local existing + pull newly created
    child_process.execSync('rm -rf '+new_repo+' && git clone '+res.ssh_url);
    console.log('created new repo "'+new_repo+'" from existing repo "'+existing_repo_path+'"\'s master branch');
  });
}

// delete 
function _delete(){
  var existing_repo = args['_'][1];
  var existing_repo_path = args['_'][2];
  var rm_path = existing_repo_path || existing_repo;
  username = username || args['user'];

  // delete github repo
  github.repos.delete({ user: username, repo: existing_repo }, function(err, res){
    console.log( JSON.stringify( err ) );
    console.log( JSON.stringify( res ) );
    // delete local repo
    child_process.execSync('rm -rf '+rm_path );
    console.log('deleted repo "'+existing_repo+'"');
  });
}