import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AdminLanding from './components/layout/AdminLanding'
import AdminPage from './components/auth/AdminPage'
import AuthContextProvider from './contexts/AuthContext';
import DashBoard from './views/DashBoard';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/user/login' render={props => <Auth {...props} authRoute='user-login'/>}/>
          <Route exact path='/user/register' render={props => <Auth {...props} authRoute='user-register'/>}/>
          <Route exact path='/employer/login' render={props => <Auth {...props} authRoute='employer-login'/>}/>
          <Route exact path='/employer/register' render={props => <Auth {...props} authRoute='employer-register'/>}/>
          <Route exact path='/admin' component={AdminLanding}/>
          <Route exact path='/admin/login' component={AdminPage}/>
          <ProtectedRoute exact path='/dashboard' component={DashBoard}/>
        </Switch>
      </Router>
    </AuthContextProvider>
    
  );
}

export default App
