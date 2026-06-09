const {spawn} = require('child_process');

const p = spawn(process.execPath, ['index.js'], {cwd: __dirname, stdio: ['pipe', 'inherit', 'inherit']});

function writeLine(s, delay) {
  setTimeout(() => {
    p.stdin.write(s + '\n');
  }, delay);
}

writeLine('a', 100); // enter add mode
writeLine('Write tests | 2', 400); // submit task
writeLine('q', 1200); // quit app

p.on('close', (code) => {
  console.log('app exited with code', code);
});
