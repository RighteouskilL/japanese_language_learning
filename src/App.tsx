import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Kana from './pages/Kana';
import Kanji from './pages/Kanji';
import Vocabulary from './pages/Vocabulary';
import Situations from './pages/Situations';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kana" element={<Kana />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/vocab" element={<Vocabulary />} />
          <Route path="/situations" element={<Situations />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
