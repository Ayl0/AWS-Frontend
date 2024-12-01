import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HistoricalTrends from './pages/historicalTrends';
import Header from './components/header';

// Components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        {/* Application Routes */}
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HistoricalTrends />} />
            <Route path="/trends" element={<HistoricalTrends />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
