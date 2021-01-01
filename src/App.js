import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Students from './components/Students';
import Profile from './components/Profile'

const App = () => {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Students} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </HashRouter>
  );
}

export default App;
