import React from 'react';
import { Input } from '@/components/ui/input';

const FormulaBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-300">
      <span className="font-semibold">fx</span>
      <Input
        className="flex-grow"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a formula or value"
      />
    </div>
  );
};

export default FormulaBar;