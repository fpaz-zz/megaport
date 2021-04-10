import React, { useState } from 'react';
import Table from '../components/UI/table/Table';
import Form from '../components/UI/form/Form';

import dataSource from '../data/bake.json';

export default function Activity1() {
  const [data, setData] = useState(dataSource);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({});
  const columns = data[0] && Object.keys(data[0]);

  const applyFilter = (rows) =>
    rows.filter((row) =>
      columns.some(
        (column) => row[column].toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );

  const handelOnChange = (e) => {
    const val = e.target.value;
    setQuery(val);
  };

  const handleFieldOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    const newData = [...data];
    newData.unshift(formData);
    setData(newData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({});
  };

  const filteredData = applyFilter(data);
  const message = filteredData.length || 'No ';

  return (
    <div class="container">
      <h2>Activity 1</h2>
      <ul>
        <li>Take the following data and format it into a table</li>
        <li>
          Add toggles to sort by id, type and batter (both ascending and
          descending)
        </li>
        <li>Add a text input to filter the data</li>
        <li>Add a form to collect new baked goods</li>
        <li>Make the elements look nice using CSS</li>
      </ul>
      <Form
        fields={columns}
        data={formData}
        handleFieldOnChange={handleFieldOnChange}
        handleAddRecord={handleAddRecord}
        handleReset={handleReset}
      />
      <Table data={filteredData} />
      <div className="filter">
        <label>Filter:</label>
        <input type="text" value={query} onChange={handelOnChange} />
        <div className="results">{message} results</div>
      </div>
    </div>
  );
}
