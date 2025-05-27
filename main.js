import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'public', 'icono.ico'),
    resizable: true,
    fullscreen: false,
    frame: true, // muestra minimizar, cerrar, etc.
    webPreferences: {
      nodeIntegration: false,
    }
  });

  win.setMenu(null); // Quitar menú superior
  win.loadURL('http://localhost:5173');
  // win.webContents.openDevTools(); // ⬅️ útil si querés debug
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
