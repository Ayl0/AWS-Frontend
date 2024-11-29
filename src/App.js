import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HistoricalTrends from './pages/historicalTrends';

// Components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        {/* Application Routes */}
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
