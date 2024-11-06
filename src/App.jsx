import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Tambahkan rute untuk Dashboard */}
      </Routes>
    </Router>
  )
}

export default App
