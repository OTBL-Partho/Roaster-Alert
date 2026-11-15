const nodemailer = require('nodemailer');
const fs = require('fs');

// 1. Load Roaster Data
const roaster = JSON.parse(fs.readFileSync('roaster.json', 'utf8'));

// 2. Email Transporter Configuration (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 3. Helper: Get Dates (Bangladesh Time UTC+6)
const DAY_MS = 24 * 60 * 60 * 1000;
const nowBD = new Date(Date.now() + 6 * 60 * 60 * 1000);
// A run delayed past midnight (before noon BD) still belongs to the previous day's 4:00 PM slot,
// otherwise "tomorrow" shifts forward and one person is skipped while the next gets two emails.
const runDayBD = nowBD.getUTCHours() < 12 ? new Date(nowBD.getTime() - DAY_MS) : nowBD;
const todayStr = runDayBD.toISOString().split('T')[0];
const tomorrowStr = new Date(runDayBD.getTime() + DAY_MS).toISOString().split('T')[0];

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
};

console.log(`Running check for Tomorrow: ${tomorrowStr} (Today: ${todayStr})`);

// 4. Main Notification Logic
async function sendAlerts() {
    for (const entry of roaster) {
        // Skip if no email is provided for this person
        if (!entry.email) continue;

        // Notification for TOMORROW (Advance Alert, sent 4:00 PM BD the day before)
        if (entry.date === tomorrowStr) {
            const isMaintenanceDay = entry.day === 'Sunday' || entry.day === 'Wednesday';
            const maintenanceNote = isMaintenanceDay ? '\n\nYou have to run MAINTENANCE BATCH tomorrow.' : '';
            await sendEmail(
                entry.email,
                `🗓️ Reminder: Monitoring Duty Tomorrow – ${formatDate(entry.date)}`,
                `Hi ${entry.name},\n\nThis is an advance reminder that you have monitoring duty scheduled for tomorrow, ${formatDate(entry.date)}.${maintenanceNote}\n\nBest regards,\nAMI Roaster System`
            );
        }
    }
}

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: `"AMI Roaster System" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text
        });
        console.log(`Successfully sent email to ${to}: ${subject}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error.message);
    }
}

sendAlerts();
