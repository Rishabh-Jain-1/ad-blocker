 /*global chrome*/

import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from "react"

function App() {

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    chrome?.storage?.local?.get(['adBlockerActive'], (result) => {
      if (result.adBlockerActive !== undefined) {
        setIsActive(result.adBlockerActive);
      } else {
        chrome?.storage.local.set({ adBlockerActive: true });
      }
    });
  }, [chrome]);

  const toggleAdBlocker = () => {
    const newState = !isActive;
    setIsActive(newState);
    chrome?.storage?.local?.set({ adBlockerActive: newState }, () => {
      chrome?.runtime?.sendMessage({ type: 'TOGGLE_ADBLOCKER', isActive: newState });
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <h1>React Ad Blocker</h1>
        <label>
          <input type="checkbox" checked={isActive} onChange={toggleAdBlocker} />
          {isActive ? 'Ad Blocker is Active' : 'Ad Blocker is Inactive'}
        </label>
      </header>
    </div>
  );
}

export default App;
