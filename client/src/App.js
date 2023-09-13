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
    <div className='container'>
      <h1>CompilerLab</h1>
      <p>Online Compiler</p>
      {/* <select>
        <option value='java'>Java</option>
        <option value='cpp'>C++</option>
        <option value='c'>C</option>
        <option value='py'>Python</option>
      </select> */}
       <textarea rows='20' cols='80' 
        value={code}
        onChange={(e)=>{
        setCode(e.target.value);
        }} > </textarea>

      <button className='submit-button' onClick={handleSubmit}>
        Submit
        </button>
        <p>{output}</p>
    </div>
  );
}

export default App;
