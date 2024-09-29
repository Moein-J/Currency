import Header from "./components/Header";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./themes/theme";
import Title from "./components/Title";
import Currencies from "./components/Currencies";
import AddCurrency from "./components/AddCurrency";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: 4,
          }}
          fixed
        >
          <Header />
          <Title />
          <Currencies />
          <AddCurrency/>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
