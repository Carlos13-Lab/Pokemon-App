import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import Home from './pages/Home';
import PokemonCreate from './pages/PokemonCreate'
import Detail from './pages/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"}component={LandingPage} />
          <Route exact path={"/home"}component={Home} />
          <Route path={"/create"} component={PokemonCreate} />
          <Route exact path={"/home/:id"} component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
