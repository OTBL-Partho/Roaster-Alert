const XLSX = require('xlsx');
const fs = require('fs');

// Read Excel
const workbook = XLSX.readFile('RoasterList.xlsx');

const emailMap = {};
workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);
    excelData.forEach(row => {
        if (row.Name && row.Email) {
            emailMap[row.Name.trim()] = String(row.Email).trim();
        }
    });
});

console.log('Email Map:', emailMap);

// Read JSON
const roaster = JSON.parse(fs.readFileSync('roaster.json', 'utf8'));

// Update JSON
const updatedRoaster = roaster.map(entry => {
    const name = entry.name.trim();
    return {
        ...entry,
        email: emailMap[name] || ""
    };
});

// Write JSON
fs.writeFileSync('roaster.json', JSON.stringify(updatedRoaster, null, 2));
console.log('Successfully updated roaster.json');
