import {Switch,Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import GuardedRoute from './components/guarded_route/guarded_route';
import LandingPage from './pages/landing/landing';
import HomePage from './pages/home/home';
function App() {
  const auth = useSelector(state => state.auth.authenticated);
  console.log(auth);
  return (
    <Switch>
      <GuardedRoute path='/home'      component={ HomePage } auth={auth} />
      <GuardedRoute path='/ticket'    component={ () => <div></div>} auth={auth} />
      <GuardedRoute path='/project'   component={ () => <div></div>} auth={auth} />
      <GuardedRoute path='/ticket'    component={ () => <div></div>} auth={auth} />
      <Route path='/' default>
          <LandingPage/>
      </Route>
    </Switch>
  );
}

export default App;
