import React, { useState } from 'react';
import megaport from '../data/megaport.json';

/**
 * get the value of the property
 * @param {String} path - the object path ie. 'address.office.state'
 * @obj {Object} the object
 */
function getValue(object, path) {
  if (typeof path === 'string')
    path = path.split('.').filter((key) => key.length);
  return path.reduce((object, key) => object && object[key], object);
}

export default function Activity2() {
  const [data, setData] = useState(megaport);
  const [path, setPath] = useState();
  const [result, setResult] = useState();

  const handelOnChange = (e) => {
    setPath(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setData(JSON.parse(e.target.value));
  };

  const handleOnClick = () => {
    const val = getValue(data, path);
    setResult(JSON.stringify(val));
  };

  return (
    <div class="container">
      <h2>Activity 2</h2>
      <p>
        Given a path to a property of an object, write a function that returns
        the value of the property. The function should accept a parameter of the
        path and optionally the object you are searching in.
      </p>
      <textarea
        onChange={handleTextAreaChange}
        value={JSON.stringify(data, undefined, 4)}
      />
      <div className="filter">
        <label htmlFor="path">Path:</label>
        <input id="path" type="text" value={path} onChange={handelOnChange} />
        <button type="button" onClick={handleOnClick}>
          Find
        </button>
        {result && <div className="results">Found: {result}</div>}
      </div>
    </div>
  );
}
