import React from 'react';

import './Form.css';

export default function Form({
  data,
  fields,
  handleFieldOnChange,
  handleAddRecord,
  handleReset,
}) {
  return (
    <form>
      {fields.map((field) => {
        return (
          <div className="field">
            <label htmlFor={field}>{field.toLocaleUpperCase()}:</label>
            <input
              id={field}
              type="text"
              name={field}
              value={data[field] || ''}
              onChange={handleFieldOnChange}
            />
          </div>
        );
      })}
      <button type="button" onClick={handleAddRecord}>
        Add
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}
