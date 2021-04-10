import React, { useState } from 'react';

function getLocations(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function Activity2() {
  const [url, setURL] = useState('https://api.megaport.com/v2/locations');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  const handleOnChange = (e) => {
    setURL(e.target.value);
  };
  const handleOnClick = () => {
    const response = getLocations(url);
    setIsLoading(true);

    response
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setResult(JSON.stringify(data, undefined, 4));
      })
      .catch((error) => {
        setIsLoading(false);
        setResult(`Error: ${error}`);
      });
  };

  const message = isLoading ? 'Loading...' : result;

  return (
    <div class="container">
      <h2>Activity 3</h2>
      <p>
        Write a reusable fetch function that GETs the list of Megaport enabled
        locations from the following endpoint:
        <a href="https://api.megaport.com/v2/locations">
          https://api.megaport.com/v2/locations
        </a>{' '}
        The function should be asynchronous and return either the result or an
        error.
      </p>
      <input
        type="text"
        style={{ width: '30%' }}
        value={url}
        onChange={handleOnChange}
      ></input>
      <button type="button" onClick={handleOnClick}>
        Go
      </button>
      <textarea value={message} />
    </div>
  );
}
