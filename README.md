# 📧 Email Tracking System - Next.js

A modern email open tracking system built with Next.js, Supabase, and Tailwind CSS. This application provides a beautiful dashboard to monitor email opens in real-time using 1x1 tracking pixels.

## 🚀 Features

- **1x1 Tracking Pixel**: Invisible pixel that tracks email opens
- **Real-time Dashboard**: Beautiful UI with live statistics
- **Supabase Integration**: Secure data storage with real-time updates
- **Next.js 14**: Modern React framework with App Router
- **Tailwind CSS**: Beautiful, responsive design
- **API Routes**: Serverless functions for tracking and data retrieval
- **Automatic Refresh**: Dashboard updates every 30 seconds

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Git (for deployment)

## 🛠️ Quick Setup

### 1. Install Dependencies

```bash
cd test
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the `test` directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzEzNzIsImV4cCI6MjA2OTQ0NzM3Mn0.25j641eQJNFmRPHvJFjpGUJ4iC90fGy6k70wxsDqhbo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q

# App Configuration
NODE_ENV=development
```

### 3. Database Setup

Run the SQL setup script in your Supabase dashboard:

```sql
-- Drop the table if it exists (for clean setup)
DROP TABLE IF EXISTS email_tracking CASCADE;

-- Create the email_tracking table
CREATE TABLE email_tracking (
    id BIGSERIAL PRIMARY KEY,
    email_id TEXT NOT NULL,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_tracking_email_id ON email_tracking(email_id);
CREATE INDEX IF NOT EXISTS idx_email_tracking_opened_at ON email_tracking(opened_at);
CREATE INDEX IF NOT EXISTS idx_email_tracking_created_at ON email_tracking(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert data
CREATE POLICY "Service role can insert tracking data" ON email_tracking
    FOR INSERT TO service_role
    WITH CHECK (true);

-- Create policy to allow service role to select data
CREATE POLICY "Service role can select tracking data" ON email_tracking
    FOR SELECT TO service_role
    USING (true);
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## 📊 Dashboard Features

- **Total Opens**: Overall tracking statistics
- **Unique Emails**: Number of different email addresses tracked
- **Opens Today**: Today's email open count
- **Average Opens/Day**: 7-day average
- **Recent Opens Table**: Detailed view of all tracked opens
- **Real-time Updates**: Auto-refreshes every 30 seconds

## 🔗 API Endpoints

- **Tracking Pixel**: `GET /api/track/[emailId]`
- **Tracking Data**: `GET /api/tracking`
- **Health Check**: `GET /api/health`

## 📧 Using the Tracking Pixel

### In HTML Emails

```html
<img src="https://your-domain.com/api/track/recipient@example.com" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

### In n8n Workflow

```html
<img src="https://your-domain.com/api/track/{{ $('Generate Email ID').item.json.email_id }}" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

### Dynamic Email IDs

```html
<!-- Using email address -->
<img src="https://your-domain.com/api/track/user@example.com" />

<!-- Using campaign + user -->
<img src="https://your-domain.com/api/track/campaign123_user@example.com" />

<!-- Using timestamp -->
<img src="https://your-domain.com/api/track/1706659200_user@example.com" />
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Email tracking system"
   git remote add origin https://github.com/YOUR_USERNAME/email-tracker.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add Environment Variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xosblbqhjdlcuisxdtgi.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzEzNzIsImV4cCI6MjA2OTQ0NzM3Mn0.25j641eQJNFmRPHvJFjpGUJ4iC90fGy6k70wxsDqhbo
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvc2JsYnFoamRsY3Vpc3hkdGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3MTM3MiwiZXhwIjoyMDY5NDQ3MzcyfQ.Jh9PJr8uRPSZpWugqmFMTR1n7mywrrcYxZ3yUBWbg3Q
     NODE_ENV=production
     ```
   - Click "Deploy"

### Deploy to Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js out of the box
- **Railway**: Great for full-stack applications
- **Render**: Good alternative with generous free tier

## 📁 Project Structure

```
test/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── track/         # Tracking pixel endpoint
│   │   ├── tracking/      # Data retrieval endpoint
│   │   └── health/        # Health check endpoint
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Dashboard page
├── lib/                   # Utility functions
│   └── supabase.js        # Supabase client
├── package.json           # Dependencies
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 How It Works

1. **Email Sent**: n8n sends an email with an embedded tracking pixel
2. **Email Opened**: When the recipient opens the email, the pixel loads
3. **Tracking Request**: The pixel makes a request to `/api/track/{emailId}`
4. **Database Log**: The server logs the email ID and timestamp to Supabase
5. **Dashboard View**: View tracking data in real-time via the web dashboard

## 🔒 Security

- **Row Level Security (RLS)** enabled on Supabase
- **Service Role Key** used for server-side operations
- **Environment Variables** for sensitive configuration
- **Input Validation** on all endpoints
- **CORS** properly configured

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to fetch" error**: Check Supabase URL and service role key
2. **"Column not found" error**: Run the database setup SQL
3. **Tracking not working**: Ensure the pixel URL is accessible and HTTPS is used

### Debug Endpoints

- `/api/health` - Check server status and Supabase connection

## 📈 Advanced Usage

### Multiple Tracking Pixels

Add multiple pixels for different purposes:

```html
<!-- Open tracking -->
<img src="https://your-domain.com/api/track/open_{{ email_id }}" />

<!-- Link click tracking -->
<img src="https://your-domain.com/api/track/click_{{ email_id }}" />

<!-- Campaign tracking -->
<img src="https://your-domain.com/api/track/campaign_{{ campaign_id }}_{{ email_id }}" />
```

### Analytics Integration

Use the tracking data with other analytics tools:

```javascript
// Fetch tracking data via API
fetch('https://your-domain.com/api/tracking')
  .then(response => response.json())
  .then(data => {
    console.log('Tracking data:', data);
    // Process data for analytics
  });
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Verify your Supabase configuration
3. Check the `/api/health` endpoint
4. Review the browser console for errors

## 🎉 Success!

Once deployed, your tracking pixel will be available at:
```
https://your-deployed-domain.com/api/track/{emailId}
```

Your email tracking system is now ready for production use! 🚀 