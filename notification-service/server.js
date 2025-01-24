const amqp = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function connectQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        const queue = 'notifications';
        await channel.assertQueue(queue, { durable: true });
        
        console.log('Waiting for messages...');
        
        channel.consume(queue, async (data) => {
            const notification = JSON.parse(data.content);
            await sendEmail(notification);
            channel.ack(data);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendEmail(notification) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: notification.email,
            subject: notification.subject,
            text: notification.text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

connectQueue(); 