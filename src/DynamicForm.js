import React, { useState } from 'react';

const FormSelect = ({ options, onChange, formData, setFormData }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showChildren, setShowChildren] = useState(false);
  const [nestedForm, setNestedForm] = useState([]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Show children form select if the selected option has children and additionalInfo is true
    setShowChildren(
      options.some(
        (option) =>
          option.value === selectedValue &&
          option.additionalInfo &&
          option.children
      )
    );
    // let childrens = options.children.find(());
    // Pass the selected option value to the parent component
    onChange(selectedValue);
  };
  const handleFormSelectChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Render children form select if the selected option has children and additionalInfo is true */}
      {showChildren && (
        <div style={{ marginLeft: '20px' }}>
          <label>{'fdf'}</label>

          <FormSelect
            options={
              options.find((option) => option.value === selectedOption)
                ?.children || []
            }
            label={options.label}
            onChange={onChange}
            // onChange={() => handleFormSelectChange()}
          />
        </div>
      )}
    </div>
  );
};

const DynamicForm = () => {
  const [formData, setFormData] = useState({});

  const handleFormSelectChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const jsonData = [
    {
      name: 'nam2',
      label: 'Option 1',
      value: 'option1',
      additionalInfo: false,
      children: [
        {
          label: 'Option 1.1',
          name: 'nam3',

          value: 'option1.1',
          additionalInfo: true,
          children: [
            {
              label: 'Option 1.1.1',
              name: 'nam4',

              value: 'option1.1.1',
              additionalInfo: false,
            },
            {
              label: 'Option 1.1.2',
              name: 'nam5',

              value: 'option1.1.2',
              additionalInfo: true,
              children: [
                {
                  label: 'Option 2.1',
                  name: 'nam6',

                  value: 'option2.1',
                  additionalInfo: false,
                },
                {
                  label: 'Option 2.2',
                  name: 'nam7',

                  value: 'option2.2',
                  additionalInfo: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Option 1.2',
          name: 'nam8',

          value: 'option1.2',
          additionalInfo: true,
          children: [
            {
              type: 'text',
              label: 'Name',
            },
          ],
        },
      ],
    },
    {
      label: 'Option 2',
      name: 'nam9',

      value: 'option2',
      additionalInfo: true,
      children: [
        {
          label: 'Option 2.1',
          name: 'nam10',
          value: 'option2.1',
          additionalInfo: false,
        },
        {
          label: 'Option 2.2',
          value: 'option2.2',
          name: 'nam12',
          additionalInfo: false,
        },
      ],
    },
    { label: 'Option 3', value: 'option3', additionalInfo: false },
  ];

  return (
    <div>
      {jsonData.map((option) => (
        <div key={option.value}>
          <label>{option.label}</label>
          <FormSelect
            options={option.children || []}
            onChange={(value) => handleFormSelectChange(option.name, value)}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      ))}

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default DynamicForm;
