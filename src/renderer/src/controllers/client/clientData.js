const clientData = {
  clientId: localStorage.getItem('client_id') || null,
  betaFunctions: localStorage.getItem('beta_functions') || false,
  autoUpdate: localStorage.getItem('auto_update') || true,
  autoUpdateNotify: localStorage.getItem('auto_update_notify') || true,
};

if (!clientData.clientId) {
  try {
    window.electron.ipcRenderer.invoke('get-client-id').then((res) => {
      localStorage.setItem('client_id', res);
    });
  } catch (err) {
    throw new Error(err);
  };
};

export default clientData;