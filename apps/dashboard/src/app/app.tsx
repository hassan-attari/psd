import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, CacheProvider, Login } from '@dashboard/kit';

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
