import React, { useState } from 'react';

const FormSelect = ({ options, label, additionalInfo }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showChildren, setShowChildren] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // If the selected option has children and additionalInfo is true, show children
    if (options && additionalInfo && selectedValue !== '') {
      setShowChildren(true);
    } else {
      setShowChildren(false);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showChildren && additionalInfo && (
        <div>
          {options.map((option) =>
            option.children && option.additionalInfo ? (
              <FormSelect
                key={option.value}
                options={option.children}
                label={option.label}
                additionalInfo={option.additionalInfo}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

const MyForm = () => {
  const formData = [
    {
      label: 'First Option',
      additionalInfo: true,
      options: [
        { label: 'Child Option 1', value: 'child1', additionalInfo: false },
        { label: 'Child Option 2', value: 'child2', additionalInfo: false },
      ],
    },
    {
      label: 'Second Option',
      additionalInfo: false,
      options: [
        {
          label: 'Child Option 3',
          value: 'child3',
          additionalInfo: true,
          children: [
            {
              label: 'Grandchild Option 1',
              value: 'grandchild1',
              additionalInfo: false,
            },
            {
              label: 'Grandchild Option 2',
              value: 'grandchild2',
              additionalInfo: false,
            },
          ],
        },
        {
          label: 'Child Option 4',
          value: 'child4',
          additionalInfo: true,
          children: [
            {
              label: 'Grandchild Option 3',
              value: 'grandchild3',
              additionalInfo: false,
            },
            {
              label: 'Grandchild Option 4',
              value: 'grandchild4',
              additionalInfo: false,
            },
          ],
        },
      ],
    },
    // Add more FormSelect objects as needed
  ];

  return (
    <div>
      {formData.map((formSelect) => (
        <FormSelect
          key={formSelect.label}
          options={formSelect.options}
          label={formSelect.label}
          additionalInfo={formSelect.additionalInfo}
        />
      ))}
    </div>
  );
};

export default MyForm;
