import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function evaluateFormula(formula, data) {
  if (!formula.startsWith('=')) return formula;

  const cellRegex = /[A-Z]+[0-9]+/g;
  const cellReferences = formula.match(cellRegex) || [];

  let evaluatedFormula = formula.slice(1);

  cellReferences.forEach(cellRef => {
    const [col, row] = cellRef.match(/[A-Z]+|[0-9]+/g);
    const colIndex = col.split('').reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 64, 0) - 1;
    const rowIndex = parseInt(row) - 1;
    const cellValue = data[`${rowIndex}-${colIndex}`] || '0';
    evaluatedFormula = evaluatedFormula.replace(cellRef, cellValue);
  });

  try {
    return eval(evaluatedFormula);
  } catch (error) {
    return '#ERROR!';
  }
}

export function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

export function letterToColumn(letter) {
  let column = 0;
  for (let i = 0; i < letter.length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
  }
  return column;
}