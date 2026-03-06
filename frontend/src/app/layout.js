import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import ClientLayout from "./ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
