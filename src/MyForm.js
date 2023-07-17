import React, { useState } from 'react';
import form from './form.json';

const MyForm = () => {
  const [formFields, setFormFields] = useState(form);

  // Define the onChange event handlers for different fields
  const handleTextFieldChange = (event, index) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = event.target.value;
    setFormFields(updatedFields);
  };

  const handleNumberFieldChange = (event, index) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = parseInt(event.target.value, 10);
    setFormFields(updatedFields);
  };

  const handleSelectFieldChange = (event, index) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = event.target.value;
    setFormFields(updatedFields);
  };

  const handleCheckboxFieldChange = (event, index) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = event.target.checked;
    setFormFields(updatedFields);
  };

  const handleAdditionalFieldChange = (event, index, optionValue) => {
    const updatedFields = [...formFields];
    const additionalFieldKey = `additionalFields.${optionValue}.value`;
    updatedFields[index][additionalFieldKey] = event.target.value;
    setFormFields(updatedFields);
  };

  return (
    <form>
      {formFields.map((field, index) => {
        const { type, label, value, options, additionalFields, onChange } =
          field;
        return (
          <div key={index}>
            <label>{label}</label>
            {type === 'text' && (
              <input
                type="text"
                onChange={(e) => handleTextFieldChange(e, index)}
              />
            )}
            {type === 'number' && (
              <input
                type="number"
                value={value}
                onChange={(e) => handleNumberFieldChange(e, index)}
              />
            )}
            {type === 'select' && (
              <select
                value={value}
                onChange={(e) => handleSelectFieldChange(e, index)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {type === 'checkbox' && (
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleCheckboxFieldChange(e, index)}
              />
            )}
            {type === 'radio' &&
              options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleSelectFieldChange(e, index)}
                  />
                  {option.label}
                </label>
              ))}
            {additionalFields &&
              value in additionalFields &&
              additionalFields[value].type === 'text' && (
                <input
                  type="text"
                  value={additionalFields[value].value}
                  onChange={(e) => handleAdditionalFieldChange(e, index, value)}
                />
              )}
            {additionalFields &&
              value in additionalFields &&
              additionalFields[value].type === 'number' && (
                <input
                  type="number"
                  value={additionalFields[value].value}
                  onChange={(e) => handleAdditionalFieldChange(e, index, value)}
                />
              )}
                {additionalFields &&
              value in additionalFields &&
              additionalFields[value].type === 'select' && (
                <select
                value={value}
                onChange={(e) => handleSelectFieldChange(e, index)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              )}
          </div>
        );
      })}
    </form>
  );
};

export default MyForm;
