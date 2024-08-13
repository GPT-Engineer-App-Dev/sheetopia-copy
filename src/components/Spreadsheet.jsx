import React, { useState, useCallback } from 'react';
import Header from './Header';
import Grid from './Grid';

const Spreadsheet = () => {
  const [data, setData] = useState({});

  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setData(prevData => ({
      ...prevData,
      [`${rowIndex}-${colIndex}`]: value
    }));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <Grid data={data} updateCell={updateCell} />
    </div>
  );
};

export default Spreadsheet;