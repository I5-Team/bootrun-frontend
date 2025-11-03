import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import AppRouter from './router/Approuter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
