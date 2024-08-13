import React from 'react';
import Cell from './Cell';

const ROWS = 100;
const COLS = 26;

const Grid = ({ data, updateCell }) => {
  const renderColumnHeaders = () => {
    return Array.from({ length: COLS }, (_, index) => (
      <div key={index} className="flex items-center justify-center w-24 h-8 bg-gray-100 border-r border-b border-gray-300 font-semibold">
        {String.fromCharCode(65 + index)}
      </div>
    ));
  };

  const renderRows = () => {
    return Array.from({ length: ROWS }, (_, rowIndex) => (
      <div key={rowIndex} className="flex">
        <div className="flex items-center justify-center w-12 h-8 bg-gray-100 border-r border-b border-gray-300 font-semibold">
          {rowIndex + 1}
        </div>
        {Array.from({ length: COLS }, (_, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={data[`${rowIndex}-${colIndex}`] || ''}
            onChange={(value) => updateCell(rowIndex, colIndex, value)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="inline-block min-w-full">
        <div className="flex">
          <div className="w-12 h-8 bg-gray-100 border-r border-b border-gray-300"></div>
          {renderColumnHeaders()}
        </div>
        {renderRows()}
      </div>
    </div>
  );
};

export default Grid;