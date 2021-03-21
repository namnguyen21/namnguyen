import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const THEME = {
  colors: {
    paper: "rgba(9, 15, 27, 0.95)",
    link: "#FF9A8A",
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
