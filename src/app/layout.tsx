export const metadata = {
     title: "Freedom",
     description: "Freedom of communications"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="ru">
               <body>{children}</body>
          </html>
     );
}
