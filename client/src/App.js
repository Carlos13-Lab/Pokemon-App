// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import Home from './pages/Home';
import PokemonCreate from './pages/PokemonCreate'




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"}component={LandingPage} />
          <Route exact path={"/home"}component={Home} />
          <Route path={"/pokemons"} component={PokemonCreate} />
          {/* <Route exact path={"/home/:id"} component={Detail} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
