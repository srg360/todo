import React,{Fragment} from 'react';
import './App.css';

//components
import AddTodo from './components/AddTodo';
import ListTodos from './components/ListTodos';

function App() {
  return <Fragment>
    <div className="container">
      <AddTodo/>
      <ListTodos/>
    </div>
  </Fragment>;
}

export default App;
