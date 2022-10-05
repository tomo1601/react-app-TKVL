import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import AuthUser from './views/AuthUser'
import AuthEmployer from './views/AuthEmployer'
import AdminLanding from './components/layout/AdminLanding'
import AdminPage from './components/auth/AdminPage'
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import DashBoard from './views/DashBoard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import Profile from './components/posts/users/Profile';
import EmpProfile from './components/posts/employer/EmpProfile'
import EmpPost from './components/posts/employer/EmpPost';
import EmployerPostContextProvider from './contexts/EmployerPostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
      <EmployerPostContextProvider>

      <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/user/login' render={props => <AuthUser {...props} authRoute='user-login'/>}/>
          <Route exact path='/user/register' render={props => <AuthUser {...props} authRoute='user-register'/>}/>
          <Route exact path='/employer/login' render={props => <AuthEmployer {...props} authRoute='employer-login'/>}/>
          <Route exact path='/employer/register' render={props => <AuthEmployer {...props} authRoute='employer-register'/>}/>
          <Route exact path='/admin' component={AdminLanding}/>
          <Route exact path='/admin/login' component={AdminPage}/>
          <ProtectedRoute exact path='/dashboard' component={DashBoard}/>
          <ProtectedRoute exact path='/profile' component={Profile}/>
          <ProtectedRoute exact path='/employer/profile' component={EmpProfile}/>
          <ProtectedRoute exact path='/employer/posts' component={EmpPost}/>
          
        </Switch>
      </Router>
      </EmployerPostContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
    
  );
}

export default App
