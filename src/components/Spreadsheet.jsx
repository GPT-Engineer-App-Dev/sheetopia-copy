import React, { useState, useCallback } from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import Grid from './Grid';
import { columnToLetter } from '@/lib/utils';

const Spreadsheet = () => {
  const [data, setData] = useState({});
  const [selectedCell, setSelectedCell] = useState('A1');

  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setData(prevData => ({
      ...prevData,
      [`${rowIndex}-${colIndex}`]: value
    }));
    setSelectedCell(`${columnToLetter(colIndex + 1)}${rowIndex + 1}`);
  }, []);

  const handleFormatChange = (format) => {
    // Implement formatting logic here
    console.log(`Applying ${format} to ${selectedCell}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <Toolbar selectedCell={selectedCell} onFormatChange={handleFormatChange} />
      <Grid data={data} updateCell={updateCell} />
    </div>
  );
};

export default Spreadsheet;