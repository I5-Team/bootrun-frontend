import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import AppRouter from './router/AppRouter';
import { LoadingSpinner } from './components/HelperComponents';
import { useVerifyAuth } from './queries/useAuthQueries';
import { ModalProvider } from './contexts/ModalContext';

function App() {
  const { isLoading } = useVerifyAuth();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalProvider>
        {isLoading ? <LoadingSpinner /> : <AppRouter />}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
