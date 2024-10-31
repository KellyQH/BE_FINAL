import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import PositionList from './pages/PositionList';
import PositionForm from './pages/PositionForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/teachers" component={TeacherList} />
          <Route path="/teacher-form" component={TeacherForm} />
          <Route path="/positions" component={PositionList} />
          <Route path="/position-form" component={PositionForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;