# Email Setup Documentation

This guide explains how to set up email functionality to receive game data and dreams from the birthday website.

## Option 1: EmailJS (Recommended - No Backend Required)

EmailJS allows you to send emails directly from the frontend without a backend server.

### Setup Steps:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:

```html
Subject: 🎂 Birthday Website - Game Results & Dreams

Hello!

Here are the results from the birthday website:

{{message}}

Sent at: {{timestamp}}
From: {{from_name}}
```

4. **Get Your Credentials**
   - Service ID: Found in "Email Services"
   - Template ID: Found in "Email Templates"
   - User ID: Found in "Account" > "API Keys"

5. **Update the Code**
   - Open `src/utils/emailService.ts`
   - Replace the placeholder values:

```typescript
const EMAILJS_SERVICE_ID = 'your_actual_service_id';
const EMAILJS_TEMPLATE_ID = 'your_actual_template_id';
const EMAILJS_USER_ID = 'your_actual_user_id';
const RECIPIENT_EMAIL = 'your-email@example.com';
```

### Usage:

The email will be automatically sent when the user clicks "Next Surprise" after completing the games and dreams sections. The email will contain:

- Quiz answers and score
- Puzzle completion status and time
- Poll responses
- Selected dreams with counts
- Timestamp of completion

## Option 2: Custom Backend (Advanced)

If you prefer to use your own backend server:

### Backend Setup (Node.js/Express example):

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Configure nodemailer
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/save-birthday-data', async (req, res) => {
  try {
    const { gameData, dreamsData, timestamp } = req.body;
    
    const emailContent = formatEmailContent(gameData, dreamsData);
    
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: 'recipient@example.com',
      subject: '🎂 Birthday Website Results',
      text: emailContent
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function formatEmailContent(gameData, dreamsData) {
  // Format the email content (same as in emailService.ts)
}

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

### Frontend Usage:

```typescript
// In your component
import { sendToBackend } from '../utils/emailService';

const handleComplete = async () => {
  await sendToBackend();
  onComplete();
};
```

## Data Structure

### Game Data:
```typescript
{
  quizAnswers: number[];     // Array of selected answer indices
  quizScore: number;         // Total correct answers
  puzzleCompleted: boolean;  // Whether puzzle was solved
  puzzleTime: number;        // Time taken to solve puzzle (seconds)
  pollAnswers: number[];     // Array of poll response indices
}
```

### Dreams Data:
```typescript
{
  checkedDreams: number[];   // Array of checked dream IDs
  totalDreams: number;       // Total number of dreams available
  checkedCount: number;      // Number of dreams selected
  timestamp: string;         // ISO timestamp of completion
}
```

## Testing

1. **Test EmailJS Setup:**
   - Complete the games and dreams sections
   - Check your email for the results
   - Verify all data is included correctly

2. **Debug Issues:**
   - Check browser console for errors
   - Verify EmailJS credentials are correct
   - Ensure email template is properly configured

## Security Notes

- EmailJS credentials are safe to use in frontend code
- For backend solutions, use environment variables for sensitive data
- Consider rate limiting to prevent spam
- Validate data before sending emails

## Troubleshooting

**Common Issues:**

1. **Email not received:**
   - Check spam folder
   - Verify EmailJS service is active
   - Check template configuration

2. **CORS errors:**
   - EmailJS handles CORS automatically
   - For custom backend, ensure CORS is configured

3. **Data not saving:**
   - Check localStorage in browser dev tools
   - Verify data is being stored before email send

## Cost Considerations

- **EmailJS Free Tier:** 200 emails/month
- **EmailJS Paid Plans:** Start at $15/month for 1000 emails
- **Custom Backend:** Depends on hosting and email service costs

Choose the option that best fits your needs and technical requirements!