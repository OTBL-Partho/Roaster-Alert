const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('RoasterList.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const formattedData = data.map(row => {
        let date = row.Date;
        // Handle Excel numeric date format
        if (typeof date === 'number') {
            date = new Date(Math.round((date - 25569) * 86400 * 1000)).toISOString().split('T')[0];
        } else if (date instanceof Date) {
            date = date.toISOString().split('T')[0];
        }
        
        return {
            date: date,
            day: row.DayH,
            name: row.Name,
            email: row.Email || ''
        };
    });

    fs.writeFileSync('roaster.json', JSON.stringify(formattedData, null, 2));
    console.log('✅ Successfully updated roaster.json with emails!');
} catch (err) {
    console.error('❌ Error converting Excel:', err.message);
}
