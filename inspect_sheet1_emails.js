const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');
const worksheet = workbook.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(worksheet);

data.forEach((row, i) => {
    if (row.Email !== undefined) {
        console.log(`Row ${i}: Name: ${row.Name}, Email: [${row.Email}]`);
    }
});
