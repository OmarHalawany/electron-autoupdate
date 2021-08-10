import React, { useState, useEffect } from 'react';

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.electron.request("app_version");
    window.electron.response("app_version", (data) => {
      console.log("app v");
      let version = document.getElementById("version");
      version.innerText = data.version
    });
    window.electron.response('update_available', () => {
      console.log("Update av1");
      let message = document.getElementById("message");
      message.innerText = 'A new update is available. Downloading now...';
    });
    window.electron.response('update_downloaded', () => {
      console.log("Update dw1");
      let message = document.getElementById("message");
      message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
      setShowButton(true);
    });
  }, [])

  const restart = () => {
    console.log("btn click")
    window.electron.request("restart_app");
  }

  return (
    <div className="App">
      <h1>Version</h1>
      <h2 id="version"></h2>
      <p id="message">no updates available</p>
      {showButton && <button onClick={restart}>Restart</button>}
    </div>
  );
}

export default App;
