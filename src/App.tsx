import { Navigate, Route, Routes } from 'react-router-dom';
import { DatePicker } from './pages/DatePicker';
import { GameList } from './pages/GameList';
import { GameCatchup } from './pages/GameCatchup';
import { Status } from './pages/Status';

export const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<DatePicker />} />
        <Route path="/status" element={<Status />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/game/:gameId" element={<GameCatchup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
