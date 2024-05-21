
import React from 'react';

const LanguageSelector = ({ onSelectLanguage }) => {
  return (
    <select onChange={(e) => onSelectLanguage(e.target.value)}>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="c">C</option>
      <option value="py">Python</option>
    </select>
  );
};

export default LanguageSelector;
