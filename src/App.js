
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Home />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
