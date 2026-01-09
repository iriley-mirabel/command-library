import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Install from './pages/Install';
import CommandDetail from './pages/CommandDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/install" element={<Install />} />
        <Route path="/command/:slug" element={<CommandDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

