"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import theme from "@/theme/theme";
import { store } from "../store/store";
import { AuthProvider } from "../context/AuthProvider";
import { LanguageProvider } from "../context/LanguageContext";
import Layout from "../layout/Layout";

const ClientLayout = ({ children }) => {
  return (
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
  );
};

export default ClientLayout;
