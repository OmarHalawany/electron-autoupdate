const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "electron", {
    request: (channel, data) => {
        // whitelist channels
        let validChannels = ["app_version", "update_available", "update_downloaded"];
        if (validChannels.includes(channel)) {
            console.log(channel);
            ipcRenderer.send(channel, data);
        }
    },
    response: (channel, func) => {
        let validChannels = ["app_version", "update_available", "update_downloaded"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            console.log(channel);
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
}
);