const nodemailer = require('nodemailer');
const fs = require('fs');

// 1. Load Roaster Data
const roaster = JSON.parse(fs.readFileSync('roaster.json', 'utf8'));

// 2. Email Transporter Configuration (Using Environment Variables)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your business SMTP settings
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 3. Helper: Get Dates
const todayStr = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
};

console.log(`Running check for Today: ${todayStr} and Tomorrow: ${tomorrowStr}`);

// 4. Main Notification Logic
async function sendAlerts() {
    for (const entry of roaster) {
        // Skip if no email is provided for this person
        if (!entry.email) continue;

        // Notification for TODAY
        if (entry.date === todayStr) {
            await sendEmail(
                entry.email,
                `🚨 Your Monitoring Duty is TODAY – ${formatDate(entry.date)}`,
                `Hi ${entry.name},\n\nThis is a reminder that your Monitoring Duty is scheduled for TODAY, ${formatDate(entry.date)}.\n\nPlease be prepared.\n\nBest regards,\nAMI Roaster System`
            );
        }

        // Notification for TOMORROW (Advance Alert)
        if (entry.date === tomorrowStr) {
            await sendEmail(
                entry.email,
                `📅 Reminder: Monitoring Duty Tomorrow – ${formatDate(entry.date)}`,
                `Hi ${entry.name},\n\nThis is an advance reminder that you have monitoring duty scheduled for tomorrow, ${formatDate(entry.date)}.\n\nBest regards,\nAMI Roaster System`
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
