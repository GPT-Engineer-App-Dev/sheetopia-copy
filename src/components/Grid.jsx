import React, { useState, useCallback } from 'react';
import Cell from './Cell';
import { columnToLetter } from '@/lib/utils';

const ROWS = 100;
const COLS = 26;

const Grid = ({ data, updateCell }) => {
  const [columnWidths, setColumnWidths] = useState(Array(COLS).fill(100));
  const [resizing, setResizing] = useState(null);

  const handleMouseDown = (index) => {
    setResizing(index);
  };

  const handleMouseMove = useCallback((e) => {
    if (resizing !== null) {
      const newWidths = [...columnWidths];
      newWidths[resizing] = Math.max(50, e.clientX - e.target.getBoundingClientRect().left);
      setColumnWidths(newWidths);
    }
  }, [resizing, columnWidths]);

  const handleMouseUp = () => {
    setResizing(null);
  };

  React.useEffect(() => {
    if (resizing !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, handleMouseMove]);

  const renderColumnHeaders = () => {
    return Array.from({ length: COLS }, (_, index) => (
      <div
        key={index}
        className="flex items-center justify-center bg-gray-100 border-r border-b border-gray-300 font-semibold relative"
        style={{ width: `${columnWidths[index]}px`, height: '32px' }}
      >
        {columnToLetter(index + 1)}
        <div
          className="absolute right-0 top-0 w-1 h-full cursor-col-resize"
          onMouseDown={() => handleMouseDown(index)}
        />
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
          <div key={`${rowIndex}-${colIndex}`} style={{ width: `${columnWidths[colIndex]}px` }}>
            <Cell
              value={data[`${rowIndex}-${colIndex}`] || ''}
              onChange={(value) => updateCell(rowIndex, colIndex, value)}
              data={data}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          </div>
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