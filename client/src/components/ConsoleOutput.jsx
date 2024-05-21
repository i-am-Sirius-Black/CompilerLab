// ConsoleOutput.js
import React from 'react';

const ConsoleOutput = ({ value }) => {
  return (
    <div>
      <label className="output-label">Console Output:</label>
      <textarea className="output" rows="20" cols="70" value={value} readOnly></textarea>
    </div>
  );
};

export default ConsoleOutput;
