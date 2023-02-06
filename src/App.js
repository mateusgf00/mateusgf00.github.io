
import { ThemeProvider } from 'styled-components';
import { HashRouter } from 'react-router-dom';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';
import Home from '../src/pages/home';

function App() {
  return (
    <HashRouter basename='/'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Home />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
