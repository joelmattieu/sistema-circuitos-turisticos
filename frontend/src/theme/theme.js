import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-montserrat), Roboto, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF9800",
    },
    tertiary: {
      main: "#26C6DA",
    },
    background: {
      main: "#FAFAFA",
      white: "#FFFFFF",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
