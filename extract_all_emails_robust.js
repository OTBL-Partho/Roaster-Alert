const XLSX = require('xlsx');
const workbook = XLSX.readFile('RoasterList.xlsx');

const emailMap = {};

workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    data.forEach(row => {
        let name = null;
        let email = null;
        
        // Try to find Name and Email in any column
        for (const key in row) {
            const val = String(row[key]).trim();
            if (key.toLowerCase().includes('name')) {
                name = val;
            } else if (key.toLowerCase().includes('email') || val.includes('@')) {
                email = val;
            }
        }
        
        if (name && email && email.includes('@')) {
            if (!emailMap[name]) {
                emailMap[name] = email;
            }
        }
    });
});

console.log(JSON.stringify(emailMap, null, 2));
