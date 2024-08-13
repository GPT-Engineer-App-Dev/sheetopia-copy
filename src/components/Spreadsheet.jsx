import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import Grid from './Grid';
import { columnToLetter } from '@/lib/utils';

const Spreadsheet = () => {
  const [data, setData] = useState({});
  const [selectedCell, setSelectedCell] = useState('A1');
  const [cellFormats, setCellFormats] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('spreadsheetData');
    const savedFormats = localStorage.getItem('spreadsheetFormats');
    if (savedData) setData(JSON.parse(savedData));
    if (savedFormats) setCellFormats(JSON.parse(savedFormats));
  }, []);

  useEffect(() => {
    localStorage.setItem('spreadsheetData', JSON.stringify(data));
    localStorage.setItem('spreadsheetFormats', JSON.stringify(cellFormats));
  }, [data, cellFormats]);

  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setData(prevData => ({
      ...prevData,
      [`${rowIndex}-${colIndex}`]: value
    }));
    setSelectedCell(`${columnToLetter(colIndex + 1)}${rowIndex + 1}`);
  }, []);

  const handleFormatChange = (format) => {
    setCellFormats(prevFormats => ({
      ...prevFormats,
      [selectedCell]: {
        ...prevFormats[selectedCell],
        [format]: !prevFormats[selectedCell]?.[format]
      }
    }));
  };

  const handleFormulaChange = (formula) => {
    const [col, row] = selectedCell.match(/[A-Z]+|[0-9]+/g);
    const colIndex = columnToLetter(col) - 1;
    const rowIndex = parseInt(row) - 1;
    updateCell(rowIndex, colIndex, formula);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <Toolbar selectedCell={selectedCell} onFormatChange={handleFormatChange} />
      <FormulaBar
        value={data[`${parseInt(selectedCell.match(/\d+/)[0]) - 1}-${columnToLetter(selectedCell.match(/[A-Z]+/)[0]) - 1}`] || ''}
        onChange={handleFormulaChange}
      />
      <Grid
        data={data}
        updateCell={updateCell}
        cellFormats={cellFormats}
        setSelectedCell={setSelectedCell}
      />
    </div>
  );
};

export default Spreadsheet;