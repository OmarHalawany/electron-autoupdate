import React, { useState, useEffect } from 'react';

function App() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    let version = document.getElementById("version");
    let message = document.getElementById("message");
    window.electron.response("app_version", (data) => {
      version.innerText = data.version
    });
    window.electron.request("app_version");
    window.electron.response('update_available', () => {
      message.innerText = 'A new update is available. Downloading now...';
    });
    window.electron.response('update_downloaded', () => {
      message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
      setShowButton(true);
    });
  }, [])


  const restart = () => {
    window.electron.request("restart_app");
  }

  return (
    <div className="App">
      <h1>Version</h1>
      <h2 id="version"></h2>
      <p id="message">no updates available</p>
      {showButton && <button onClick={() => restart()}>Restart</button>}
    </div>
  );
}

export default App;
