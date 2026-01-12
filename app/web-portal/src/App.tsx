import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Scripts from './pages/Scripts';
import Install from './pages/Install';
import CommandDetail from './pages/CommandDetail';
import ScriptDetail from './pages/ScriptDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/scripts" element={<Scripts />} />
        <Route path="/install" element={<Install />} />
        <Route path="/command/:slug" element={<CommandDetail />} />
        <Route path="/script/:slug" element={<ScriptDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

