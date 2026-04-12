const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

const emailsFound = data.filter(row => row.Email);
console.log(JSON.stringify(emailsFound, null, 2));
