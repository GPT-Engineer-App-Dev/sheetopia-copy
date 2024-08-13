import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Sheets Clone</h1>
        <Input className="w-64" placeholder="Untitled spreadsheet" />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">Share</Button>
        <Button>Comments</Button>
      </div>
    </header>
  );
};

export default Header;