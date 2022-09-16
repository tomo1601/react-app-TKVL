import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AdminPage from './components/auth/AdminPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/user/login' render={props => <Auth {...props} authRoute='user-login'/>}/>
        <Route exact path='/user/register' render={props => <Auth {...props} authRoute='user-register'/>}/>
        <Route exact path='/employer/login' render={props => <Auth {...props} authRoute='employer-login'/>}/>
        <Route exact path='/employer/register' render={props => <Auth {...props} authRoute='employer-register'/>}/>
        <Route exact path='/admin' component={AdminPage}/>
      </Switch>
    </Router>
  );
}

export default App
