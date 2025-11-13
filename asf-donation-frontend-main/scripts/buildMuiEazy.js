const fs = require('fs');
const exec = require('child_process').exec

fs.cpSync("src/muiEazy", '../src/muiEazy/src', { recursive: true });

exec('npm run build:debug', { cwd: '../src/muiEazy' }, function (error, stdout, stderr) {
  if (error) {
    //   console.log(stderr)
    return
  }
  //   console.log(stdout)
});