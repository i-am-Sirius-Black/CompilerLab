import "./App.css";
import { useState } from "react";
import axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';


function App() {
  const [code, setCode] = useState(`#include <iostream> 
  using namespace std;
  // Define the main function
  int main() { 
      // Declare variables
      int num1, num2, sum;
      // Prompt user for input
      cin >> num1 >> num2;  
      // Calculate the sum
      sum = num1 + num2;  
      // Output the result
      cout << "The sum of the two numbers is: " << sum;  
      // Return 0 to indicate successful execution
      return 0;  
  }`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState('cpp');



  
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch (error) {
      console.log( error.response);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Compiler Lab</h1>
        <div className="select-lang">
          
           <select className="select-language" onChange={(e) => setLanguage(e.target.value)}>
           <option value="" disabled selected> Language </option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="py">Python</option>
            </select>

          </div>
        <div className="editor-container" style={{ overflowY: 'auto' }}>
          
          <Editor
          className="editor"
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 'none',
              border: 'none',
              backgroundColor: '#f7fafc',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>
        <button className="run-button" onClick={handleSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="run-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
          </svg>
          Run
        </button>
      </div>


      <div className="right">
        <div className="right-container">
        <div className="input-container">
          <h2 className="input-heading">Input</h2>
          <textarea
            rows="5"
            cols="15"
            value={input}
            placeholder="Input"
            onChange={(e) => setInput(e.target.value)}
            className="input-textarea"
            // style={{ minHeight: "100px" }}
          ></textarea>
        </div>

        <div className="output-container">
          <h2 className="output-heading">Console Output:</h2>
          <div
          className="output-textarea"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          >
            {output}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
