import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const THEME = {
  colors: {
    paper: "rgba(11, 19, 34, 0.98)",
    link: "#e8e046",
    text: "#e8e8e8",
    heading: "#FFFFFF",
    textSecondary: "#86a1b5",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
