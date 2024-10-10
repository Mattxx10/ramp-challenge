import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


// function findHiddenUrl() {
//   let url = ""; 
  
//   const codeElements = document.querySelectorAll('code[data-class^="23"]');
  
//   codeElements.forEach(code => {
//     const divElement = code.querySelector('div[data-tag$="93"]');
    
//     if (divElement) {
//       const spanElement = divElement.querySelector('span[data-id*="21"]');
      
//       if (spanElement) {
//         const iElement = spanElement.querySelector('i.char');
        
//         if (iElement && iElement.getAttribute('value')) {
//           url += iElement.getAttribute('value');
//         }
//       }
//     }
//   });

//   return url; 
// }

// console.log(findHiddenUrl());


function App() {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayedFlag, setDisplayedFlag] = useState('');

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/756e63');
        const data = await response.text();
        console.log(data);
        setFlag(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flag:', error);
        setLoading(false);
      }
    };
    fetchFlag();
  }, []);

  useEffect(() => {
    if (!loading && flag) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index <= flag.length) {
          setDisplayedFlag(flag.substring(0, index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 500); // Set to 500ms (half a second) as requested

      return () => clearInterval(intervalId);
    }
  }, [loading, flag]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {loading ? 'Loading...' : displayedFlag}
        </p>
      </header>
    </div>
  );
}

export default App;
