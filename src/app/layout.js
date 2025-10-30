// app/layout.js
import './globals.css';
import { Lexend } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';

// Load the font
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend', // optional CSS variable
});

export const metadata = {
  title: 'CSGO Skins',
  description: 'CSGO Skins — Case Battle, Exchanger, and more',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.className}>
      <body style={{ backgroundColor: '#061b34', color: 'white', margin: 0 }}>
        <Navbar />
        <main style={{margin: '0 auto', maxWidth: '1440px'}}>{children}</main>
      </body>
    </html>
  );
}
