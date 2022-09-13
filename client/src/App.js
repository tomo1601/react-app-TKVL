import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/user/login' render={props => <Auth {...props} authRoute='userlogin'/>}/>
        <Route exact path='/user/register' render={props => <Auth {...props} authRoute='userregister'/>}/>
      </Switch>
    </Router>
  );
}

export default App
