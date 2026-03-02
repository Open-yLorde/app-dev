import electron from "electron";
import { ipcMain } from "electron";

function netIPC() {
    ipcMain.handle('net:select-file-to-upload', async () => {
        try {
            await electron.dialog.showOpenDialog({
                buttonLabel: 'Selecione o arquivo',
                title: 'VShelf - Selecione o arquivo...',
                filters: [
                    { name: 'arquivo', extensions: ['zip', '7z', 'rar', 'tar.gz', 'tar.xz'] },
                ],
                properties: ['openFile'],
                message: 'VShelf - Selecione um arquivo...',
                securityScopedBookmarks: true,
                defaultPath: electron.app.getPath('documents'),
            }).then((result) => {
                if (!result.canceled) {
                    console.log(result);
                };
            });
        } catch (err) {
            throw new Error(err);
        };
    });
};

export default netIPC;