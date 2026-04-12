const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');
const sheetName = 'Sheet2';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);
console.log(JSON.stringify(data, null, 2));
