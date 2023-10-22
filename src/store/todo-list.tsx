import { createContext, useMemo, useState } from "react";

import { uid } from "uid/secure";

import {
  todoListLocalStorageKey,
  todoListSortByLocalStorageKey,
} from "../utils/todo-list/utils";

import { Action, SortBy, Todo, TodoItem } from "../types/todo-list";

interface TodoContext {
  todos: Todo[];
  dispatchAction: Action;
  sortBy: SortBy;
  changeSortBy: (sortBy: SortBy) => void;
}

export const TodoContext = createContext<TodoContext>({
  todos: [],
  dispatchAction: () => {},
  sortBy: "none",
  changeSortBy: () => {},
});

const getDefaultTodoItem = (): TodoItem => ({
  id: uid(),
  text: "",
  isCompleted: false,
  createdTime: new Date().toString(),
  updatedTime: new Date().toString(),
});

const getDefaultTodo = (): Todo => ({
  id: uid(),
  title: "",
  todos: [getDefaultTodoItem()],
  createdTime: new Date().toString(),
  updatedTime: new Date().toString(),
  deadline: null,
});

export const TodoProvider = ({ children }: { children: any }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todos = JSON.parse(
      localStorage.getItem(todoListLocalStorageKey) || "[]"
    );
    return todos;
  });
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const defaultSortBy = (localStorage.getItem(
      todoListSortByLocalStorageKey
    ) || "none") as SortBy;
    return defaultSortBy;
  });

  const sortedTodos = useMemo(() => {
    if (sortBy === "none") return todos;
    const sortedTodos = [...todos];
    sortedTodos.sort((todo1, todo2) => {
      const val1 = todo1[sortBy],
        val2 = todo2[sortBy];
      if (typeof val1 === "object" || typeof val2 === "object") return 0;
      if (typeof val1 === "string" || typeof val2 === "string")
        return val1.localeCompare(val2);
      if (
        ["bigint", "number"].includes(typeof val1) ||
        ["bigint", "number"].includes(typeof val1)
      )
        return 0;
      return val1 - val2;
    });
    return sortedTodos;
  }, [sortBy, todos]);

  const syncTodoListToLocalStorage = (todo: Todo[]) => {
    localStorage.setItem(todoListLocalStorageKey, JSON.stringify(todo));
  };

  const createTodo = () => {
    const todo = getDefaultTodo();
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
    return todo.id;
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
  };

  const editTodo = (id: string, key: keyof Todo, value: any) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, [key]: value, updatedTime: new Date().toString() };
    });
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
  };

  const setTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== updatedTodo.id) return todo;
      return { ...updatedTodo, updatedTime: new Date().toString() };
    });
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
  };

  const createTodoItem = (todoId: string) => {
    const todoItem = getDefaultTodoItem();
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== todoId) return todo;
      const updatedTodoItems = [...todo.todos, todoItem];
      return { ...todo, todos: updatedTodoItems };
    });
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
    return todoItem.id;
  };

  const deleteTodoItem = (todoId: string, todoItemId: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== todoId) return todo;
      let updatedTodoItems = todo.todos;
      if (todo.todos.length !== 1) {
        updatedTodoItems = todo.todos.filter(
          (todoItem) => todoItem.id !== todoItemId
        );
      }
      return { ...todo, todos: updatedTodoItems };
    });
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
  };

  const editTodoItem = (
    todoId: string,
    todoItemId: string,
    key: keyof TodoItem,
    value: any
  ) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== todoId) return todo;
      const updatedTodoItems = todo.todos.map((todoItem) => {
        if (todoItem.id !== todoItemId) return todoItem;
        return { ...todoItem, [key]: value };
      });
      return {
        ...todo,
        todos: updatedTodoItems,
        updatedTime: new Date().toString(),
      };
    });
    setTodos(updatedTodos);
    syncTodoListToLocalStorage(updatedTodos);
  };

  const dispatchAction: Action = ({ type, payload }) => {
    switch (type) {
      case "create-todo":
        return createTodo();
      case "delete-todo":
        deleteTodo(payload.todoId);
        break;
      case "edit-todo":
        editTodo(payload.todoId, payload.key, payload.value);
        break;
      case "set-todo":
        setTodo(payload.todo);
        break;
      case "create-todo-item":
        return createTodoItem(payload.todoId);
      case "delete-todo-item":
        deleteTodoItem(payload.todoId, payload.todoItemId);
        break;
      case "edit-todo-item":
        editTodoItem(
          payload.todoId,
          payload.todoItemId,
          payload.key,
          payload.value
        );
        break;
    }
  };

  const changeSortBy = (targetSortBy: SortBy) => {
    let updatedSortBy: SortBy = "none";
    if (targetSortBy !== sortBy) updatedSortBy = targetSortBy;
    setSortBy(updatedSortBy);
    localStorage.setItem(todoListSortByLocalStorageKey, updatedSortBy);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: sortedTodos,
        dispatchAction,
        sortBy,
        changeSortBy,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
