const { spawn } = require('child_process');
const path = require('path');

function launchElectron(userData) {
  const electronPath = path.resolve(__dirname, '../../../node_modules/.bin/electron');
  const mainPath = path.resolve(__dirname, '../../../main.js');

  const subprocess = spawn(electronPath, [mainPath], {
    env: {
      ...process.env,
      USER_DATA: JSON.stringify(userData),
    },
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  subprocess.on('error', (err) => {
    console.error('Error al lanzar Electron:', err);
  });
}

module.exports = { launchElectron };
