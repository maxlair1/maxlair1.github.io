import './globals.css';
import type { Metadata } from 'next';
import { Inter, Google_Sans_Code } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
const googlesanscode = Google_Sans_Code({ weight: ['300']});

export const metadata: Metadata = {
  metadataBase: new URL('https://maxlair1.github.io'),
  alternates: {
    canonical: './'
  },
  title: {
    default: 'Max Lair',
    template: '%s | Max Lair'
  },
  description: 'My portfolio, blog, and personal website.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googlesanscode.className}${inter.className} dark:bg-taupe-950`}>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-taupe-950 bg-white text-taupe-1200 dark:text-taupe-300">
          <main className="max-w-[60ch] mx-auto w-full space-y-6 mt-20">
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: 'linkedin', url: 'https://www.linkedin.com/in/maxlair' },
    { name: 'github', url: 'https://github.com/maxlair1' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className='text-taupe-500 hover:text-taupe-700 dark:text-taupe-400 hover:dark:text-taupe-300 dark:underline dark:underline-offset-2 dark:decoration-taupe-700'
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
