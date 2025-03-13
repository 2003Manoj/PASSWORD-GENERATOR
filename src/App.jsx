import { useState, useEffect, useRef } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';         
function App() {
  let [length, setLength] = useState(4);
  let [includeNumbers, setIncludeNumbers] = useState(false);
  let [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);
  let [password, setPassword] = useState('');
  

  

  let char = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm';

  let passwordgenerator = () => {
    let pass = '';
    if (includeNumbers) {
      char += '1234567890';
    }
    if (includeSpecialCharacters) {
      char += '!@#$%^&*()_+';
    }

    for (let i = 0; i < length; i++) {
      pass += char[Math.floor(Math.random() * char.length)];
    }

    setPassword(pass);
  };

  useEffect(() => {
    passwordgenerator();
  }, [length, includeNumbers, includeSpecialCharacters]);

  const passwordInputRef = useRef(null);
  const copyButtonRef = useRef(null);
  let passwordcopy = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password Copied');
    passwordInputRef.current.select();
    
  };

  return (
    <>
    <ToastContainer />
    <div className="password-generator-container">
      <h2>Password Generator</h2>

      <div className="options">
        <div className="option">
          <label>Length</label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span>{length}</span>
        </div>

        <div className="option">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>
        </div>

        <div className="option">
          <label>
            <input
              type="checkbox"
              checked={includeSpecialCharacters}
              onChange={() => setIncludeSpecialCharacters(!includeSpecialCharacters)}
            />
            Include Special Characters
          </label>
        </div>
      </div>

      <div className="password-display">
        <input
          ref={passwordInputRef}
          type="text"
          readOnly
          placeholder="Generated password will appear here"
          value={password}
        />
        <button ref={copyButtonRef} onClick={passwordcopy}>
          Copy Password
        </button>
      </div>
    </div>
              </>
  );
}

export default App;
