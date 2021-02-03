import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const THEME = {
  colors: {
    paper: "#0b1221",
    link: "#e8e046",
    text: "#FFFFFF",
    textSecondary: "#86a1b5",
  },
  font: {
    body: "'Open Sans', sans-serif",
    heading: "'Ubuntu', sans-serif",
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
