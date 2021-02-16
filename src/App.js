import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth, database } from './firebase';
import {useDispatch, useSelector} from 'react-redux';
import { login, logout, selectUser, selectUserPlan, setUserPlan } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectUserPlan)?.plan;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        database.ref('users/' + userAuth.uid).on('value', (snapshot) => {
          dispatch(setUserPlan(snapshot.val()));
        })
      }
      else dispatch(logout());
    });
    return unsubcribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? <LoginScreen /> : (
        <Switch>
          <Route path="/profile">
            <ProfileScreen />
          </Route>
          <Route exact path='/'>
            {!currentPlan && (<Redirect to="/profile"/>)}
            <HomeScreen />
          </Route>
        </Switch>
        )}
    </Router>
    </div>
  );
}

export default App;
