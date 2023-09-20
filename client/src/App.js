import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {

const [code, setCode] = useState('');
const [output, setOutput] = useState('');

const handleSubmit = async () => {
  const payload = {
    language: 'cpp',
    code
  }

  try {
    const {data} = await axios.post('http://localhost:5000/run', payload);
    setOutput(data.output);
  } catch (error) {
     console.log(error.response);
  }
};

  return (
    <section>
    <div className='container'>
     
      <h1>CompilerLab</h1>

          <select className='select-language'>
            <option value='cpp'>C++</option>
            <option value='java'>Java</option>
            {/* <option value='c'>C</option>
            <option value='py'>Python</option> */}
          </select>

       <textarea rows='20' cols='80' 
        value={code}
        onChange={(e)=>{
        setCode(e.target.value);
        }} > </textarea>

      <button className='submit-button' onClick={handleSubmit}>
        Submit
        </button>
        {/* <p className='output'>{output}</p> */}
        <label className="output-label">Console Output:</label>
        <textarea className='output' rows="20" cols="70" value={output}>
        
        </textarea>
        </div>
          <footer className="footer">
            <i className="liknedIn"></i>
            <i className="github"></i>
            <p>© Copyright 2023 CompilerLab</p>

           </footer>
        </section>
  );
}

export default App;
