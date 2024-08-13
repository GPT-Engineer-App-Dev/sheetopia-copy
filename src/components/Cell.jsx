import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { evaluateFormula } from '@/lib/utils';
import { cn } from '@/lib/utils';

const Cell = ({ value, onChange, data, rowIndex, colIndex, format, onSelect }) => {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setCellValue(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(cellValue);
  };

  const handleChange = (e) => {
    setCellValue(e.target.value);
  };

  const displayValue = editing ? cellValue : evaluateFormula(cellValue, data);

  const cellClass = cn(
    "w-full h-full border-r border-b border-gray-300 flex items-center overflow-hidden",
    format?.bold && "font-bold",
    format?.italic && "italic",
    format?.underline && "underline",
    format?.alignLeft && "justify-start",
    format?.alignCenter && "justify-center",
    format?.alignRight && "justify-end"
  );

  return (
    <div
      className={cellClass}
      onDoubleClick={handleDoubleClick}
      onClick={() => onSelect(rowIndex, colIndex)}
    >
      {editing ? (
        <Input
          ref={inputRef}
          className="w-full h-full border-none focus:ring-0 p-1"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <div className="w-full h-full px-2 py-1 overflow-hidden">{displayValue}</div>
      )}
    </div>
  );
};

export default Cell;