import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import ButtonGallery from './pages/ButtonGallery';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ButtonGallery/>
    </ThemeProvider>
  );
}

export default App;
