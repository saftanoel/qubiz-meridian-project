import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import Connect from './pages/Connect';
import OfficeExplorer from './pages/OfficeExplorer';
import AskMeridian from './pages/AskMeridian';
import HRView from './pages/HRView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="journey" element={<Journey />} />
        <Route path="connect" element={<Connect />} />
        <Route path="office" element={<OfficeExplorer />} />
        <Route path="ask" element={<AskMeridian />} />
        <Route path="hr" element={<HRView />} />
      </Route>
    </Routes>
  );
}

export default App;
