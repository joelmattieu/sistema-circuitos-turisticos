import { Montserrat } from "next/font/google";
import ClientLayout from "./ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
