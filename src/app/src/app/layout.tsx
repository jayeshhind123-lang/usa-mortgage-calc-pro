import "./globals.css";
export const metadata = {
  title: "USA Mortgage Calc Pro - $10,057 Formula",
  description: "Best USA Mortgage Calculator with taxes, insurance, PMI like Bankrate",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
