import './globals.css';

export const metadata = {
  title: 'Email Tracking Dashboard',
  description: 'Monitor your email open tracking in real-time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 