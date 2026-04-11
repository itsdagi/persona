import './globals.css';
import AppProvider from './context/AppContext';
import ChatBot from './components/ChatBot';

export const metadata = {
  title: 'Persona — Architecture Studio | Designing Spaces with Identity',
  description: 'Persona is a forward-thinking architectural and design studio led by CEO Nahom. We create bold, immersive spaces that merge innovation, precision, and artistic vision.',
  keywords: 'architecture, design studio, Persona, Nahom, architectural design, 3D visualization, interior design, urban concepts',
  openGraph: {
    title: 'Persona Architecture Studio',
    description: 'Designing spaces with identity. A forward-thinking studio led by CEO Nahom.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          {children}
          <ChatBot />
        </AppProvider>
      </body>
    </html>
  );
}
