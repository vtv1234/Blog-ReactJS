import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Posts from "./routes/postsRoute"
import Detail from './routes/postDetailRoute';
import './App.css';

function App() {
    return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/index">
            <Posts />
          </Route>
          <Route path="/post/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;