import { Route } from "wouter";

import { Header } from "./components/header";
import { TodoList } from "./components/todo-list/todo-list";
import { TodoModal } from "./components/todo-list/todo-modal";
import { ColorCodeConvertor } from "./components/color-code-convertor";

import { TodoProvider } from "./store/todo-list";

const App = () => {
  return (
    <>
      <Header />
      <Route path="/color-code-convertor" component={ColorCodeConvertor} />
      <TodoProvider>
        <Route path="/todo-list/:todoId*" component={TodoList} />
        <Route path="/todo-list/:todoId" component={TodoModal} />
      </TodoProvider>
    </>
  );
};

export default App;
