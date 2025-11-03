import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import Approuter from './router/Approuter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Approuter />
    </ThemeProvider>
  );
}

export default App;
