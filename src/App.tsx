import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import ButtonGallery from './pages/ButtonGallery';
import InputGallery from './pages/InputGallery';
import Header from './components/Header/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <ButtonGallery />
      <InputGallery />
    </ThemeProvider>
  );
}

export default App;
