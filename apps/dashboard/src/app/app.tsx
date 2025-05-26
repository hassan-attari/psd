import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, CacheProvider } from '@dashboard/kit';
import { Login } from '@dashboard/page';

export function App() {
  return (
    <CacheProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
