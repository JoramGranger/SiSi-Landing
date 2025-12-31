import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Outreach } from './pages/Outreach';
import { OutreachDetail } from './pages/OutreachDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/outreach/:id" element={<OutreachDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
