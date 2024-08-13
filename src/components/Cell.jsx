import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

const Cell = ({ value, onChange }) => {
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

  return (
    <div
      className="w-24 h-8 border-r border-b border-gray-300 flex items-center"
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <Input
          ref={inputRef}
          className="w-full h-full border-none focus:ring-0"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <div className="w-full h-full px-2 py-1 overflow-hidden">{cellValue}</div>
      )}
    </div>
  );
};

export default Cell;