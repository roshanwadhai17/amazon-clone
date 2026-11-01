// app/layout.tsx
import './globals.css';
import ClickTracker from '../components/ClickTracker';
import GlobalAudio from '../components/GlobalAudio'; // If you are still using it

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClickTracker />
        {children}
      </body>
    </html>
  );
}