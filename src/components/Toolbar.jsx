import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const Toolbar = ({ selectedCell, onFormatChange }) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-300">
      <Input className="w-64" value={selectedCell} readOnly />
      <Button variant="outline" size="icon" onClick={() => onFormatChange('bold')}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onFormatChange('italic')}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onFormatChange('underline')}>
        <Underline className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onFormatChange('alignLeft')}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onFormatChange('alignCenter')}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onFormatChange('alignRight')}>
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toolbar;