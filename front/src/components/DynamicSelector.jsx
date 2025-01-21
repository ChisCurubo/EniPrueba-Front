import React, { useState } from 'react';

const DynamicSelector = ({ options, labelTitle }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-6">
      <label htmlFor="dynamicSelector" className="block mb-2 font-semibold">{labelTitle}</label>
      <select
        id="dynamicSelector"
        value={selectedOption}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-auto"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <p className="mt-4">Usted selecciono: <strong>{selectedOption}</strong></p>
      )}
    </div>
  );
};

export default DynamicSelector;
