const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "electron", {
    request: (channel, data) => {
        // whitelist channels
        let validChannels = ["app_version", "update_available", "update_downloaded", "restart_app"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    response: (channel, func) => {
        let validChannels = ["app_version", "update_available", "update_downloaded", "restart_app"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
}
);