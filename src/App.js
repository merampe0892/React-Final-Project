import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import PokemonList from './Pages/PokemonList'
import PokemonDetails from './Pages/PokemonDetails'



function App( {renderTypes} ) {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PokemonList" element={<PokemonList />} />
          <Route path="/PokemonDetails/:id" element={<PokemonDetails renderTypes={renderTypes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
