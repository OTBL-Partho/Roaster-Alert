const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

const emailMap = {};
data.forEach(row => {
    if (row.Name && row.Email) {
        emailMap[row.Name.trim()] = row.Email.trim();
    }
});

console.log(JSON.stringify(emailMap, null, 2));
