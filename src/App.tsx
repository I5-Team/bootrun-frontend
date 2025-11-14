import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';
import AppRouter from './router/AppRouter';
import { LoadingSpinner } from './components/HelperComponents';
import { useVerifyAuth } from './queries/useAuthQueries';

function App() {
  const { isLoading } = useVerifyAuth();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
