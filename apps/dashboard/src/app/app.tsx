import { Route, Routes, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  CacheProvider,
  Login,
  SignUp,
  Home,
} from '@dashboard/kit';

export function App() {
  return (
    <CacheProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
