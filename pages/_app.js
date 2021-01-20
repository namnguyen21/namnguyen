import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const THEME = {
  colors: {
    paper: "#001118",
    link: "#e8e046",
    text: "#FFFFFF",
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
