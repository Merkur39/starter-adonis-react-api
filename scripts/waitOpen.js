/*
  This script is used by the `dev:all` task to open the browser once the server and client have been started. (see .vscode/tasks.json)
*/
import { exec } from 'child_process';
import http from 'http';

const urlClient = `http://localhost:${process.argv[2]}`;
const urlServer = `http://localhost:${process.argv[3]}`;
const timeout = 20000;
const interval = 1000;
let elapsed = 0;

function checkUrl(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      res.resume();
      resolve(true);
    }).on('error', () => resolve(false));
  });
}

async function check() {
  let ok = false;
  if (!urlServer) {
    ok = await checkUrl(urlClient);
  } else {
    const [okClient, okServer] = await Promise.all([checkUrl(urlClient), checkUrl(urlServer)]);
    ok = okClient && okServer;
  }

  if (ok) {
    console.log(urlServer
      ? `✅ Both URLs are up! Opening browser...`
      : `✅ ${urlClient} is up! Opening browser...`);
    openBrowser(urlClient);
  } else if (elapsed >= timeout) {
    console.error(urlServer
      ? `❌ Timeout: One or both URLs did not respond within ${timeout / 1000}s`
      : `❌ Timeout: ${urlClient} did not respond within ${timeout / 1000}s`);
    process.exitCode = 1;
  } else {
    elapsed += interval;
    setTimeout(check, interval);
  }
}

function openBrowser() {
  const platform = process.platform;
  let cmd =
    platform === 'win32' ? `start ${urlClient}` :
    platform === 'darwin' ? `open ${urlClient}` :
    `xdg-open ${urlClient}`;

  exec(cmd, (err) => {
    if (err) {
      console.error(`❌ Failed to open browser: ${err.message}`);
      process.exitCode = 1;
    }
  });
}

check();
