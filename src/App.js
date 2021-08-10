import React, { useState } from 'react';

function App() {
  const [showButton, setShowButton] = useState(false);

  window.electron.request("app_version");
  window.electron.response("app_version", (data) => {
    let version = document.getElementById("version");
    version.innerText = data.version
  });
  window.electron.response('update_available', () => {
    let message = document.getElementById("message");
    message.innerText = 'A new update is available. Downloading now...';
  });
  window.electron.response('update_downloaded', () => {
    let message = document.getElementById("message");
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    setShowButton(true);
  });

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
