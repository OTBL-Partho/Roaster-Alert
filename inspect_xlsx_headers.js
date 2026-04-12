const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');
console.log('Sheets:', workbook.SheetNames);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
// Get all cell addresses
const range = XLSX.utils.decode_range(worksheet['!ref']);
const headers = [];
for(let C = range.s.c; C <= range.e.c; ++C) {
  const address = XLSX.utils.encode_col(C) + "1";
  const cell = worksheet[address];
  headers.push(cell ? cell.v : `EMPTY_${C}`);
}
console.log('Headers:', headers);
