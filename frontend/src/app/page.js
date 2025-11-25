"use client";
import * as React from "react";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import { AuthProvider } from "@/context/AuthProvider";
import Layout from "@/layout/Layout";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function Page() {
  const pathname = usePathname() || "/";
  const showLayout = !["/login", "/register"].includes(pathname);

  const content = (
    <main>
      <h1>Página principal</h1>
    </main>
  );

  return (
    <>
      <Head>
        <title>PreVence</title>
        <meta
          name="description"
          content="Aplicación web para el intercambio de productos próximos a vencer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {showLayout ? <Layout>{content}</Layout> : content}
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </>
  );
}
