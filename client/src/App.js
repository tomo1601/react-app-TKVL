import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import AuthUser from './views/AuthUser'
import AuthEmployer from './views/AuthEmployer'
import AdminLanding from './components/layout/AdminLanding'
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import DashBoard from './views/DashBoard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import Profile from './components/posts/users/UserProfile'
import EmpProfile from './components/posts/employer/EmpProfile'
import EmpPost from './components/posts/employer/EmpPost'
import EmployerPostContextProvider from './contexts/EmployerPostContext'
import AuthAdmin from './views/AuthAdmin'
import AdminPost from './components/posts/admin/AdminPost'
import PostDetail from './components/posts/PostDetail'
import { UserResume } from './components/posts/users/UserResume';

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
          <Route exact path='/admin/login' render={props => <AuthAdmin {...props} authRoute='admin-login'/>}/>
          <Route exact path='/admin' component={AdminLanding}/>
          <ProtectedRoute exact path='/dashboard' component={DashBoard}/>
          <ProtectedRoute exact path='/profile' component={Profile}/>
          <ProtectedRoute exact path='/employer/profile' component={EmpProfile}/>
          <ProtectedRoute exact path='/employer/posts' component={EmpPost}/>
          <ProtectedRoute exact path='/postDetail/:id' component={PostDetail} />
          <ProtectedRoute exact path='/user/resume' component={UserResume} />

          <ProtectedRoute exact path='/admin/posts' component={AdminPost}/>

        </Switch>
      </Router>
      </EmployerPostContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
    
  );
}

export default App
