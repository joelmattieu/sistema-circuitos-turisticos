"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import { store } from "../store/store";
import { AuthProvider } from "../context/AuthProvider";
import { LanguageProvider } from "../context/LanguageContext";
import Layout from "../layout/Layout";
import theme from "../theme/theme";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageProvider>
              <AuthProvider>
                <Layout>{children}</Layout>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  draggable
                  pauseOnHover
                  theme="light"
                  style={{
                    fontSize: "14px",
                    top: "20px",
                    left: "20px",
                    right: "20px",
                    width: "auto",
                  }}
                  toastStyle={{
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
