import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Post from './pages/Post';

function App() {
  return (
    <section>
      <main>
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:subject/:id" component={Post} />
         
         
        </Switch>
      </Router>
      </main>
    </section>
     
    
  );
}

export default App;
