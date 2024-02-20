import './globals.css'
import UserProvider from './hooks/UserContext';

export const metadata = {
  title: 'Shared Plate',
  description: 'A food sharing platform to reduce food wastage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
