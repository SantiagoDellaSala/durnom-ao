import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Estas dos líneas reemplazan __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
    }
  });

  // Cargar la app de Vite
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
