import { useContext } from "react";
import { useLocation } from "wouter";

import { List } from "./list";
import { Deadline } from "./deadline";

import { TodoActions } from "./todo-actions";

import { TodoContext } from "../../store/todo-list";

import "react-calendar/dist/Calendar.css";
import "../../styles/todo-list/todo-list.css";
import "react-date-picker/dist/DatePicker.css";

export const TodoList = () => {
  const [, navigate] = useLocation();
  const { todos, dispatchAction } = useContext(TodoContext);

  const openTodoEditModal = (todoId: string) => () => {
    navigate("/todo-list/" + todoId);
  };

  const deleteTodo = (todoId: string) => () => {
    dispatchAction({
      type: "delete-todo",
      payload: {
        todoId,
      },
    });
  };

  const onDeadlineChange = (todoId: string) => (value: string) => {
    dispatchAction({
      type: "edit-todo",
      payload: {
        todoId,
        key: "deadline",
        value,
      },
    });
  };

  return (
    <main className="page px-4">
      <TodoActions />
      <div className="columns tl_todo-list mt-4">
        {todos.map((todo) => {
          return (
            <div className="column is-narrow" key={todo.id}>
              <div className="box tl_todo-preview is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
                <div
                  className="tl_todo-list-preview-wrapper"
                  onClick={openTodoEditModal(todo.id)}
                >
                  <div className="tl_todo-list-preview">
                    <List isReadOnly={true} todo={todo} />
                  </div>
                </div>
                <div className="tl_divider"></div>
                <div className="tl_todo-info-group is-flex is-justify-content-space-between">
                  <span
                    title={todo.title}
                    className="tl_todo-title has-text-weight-bold"
                  >
                    {todo.title}
                  </span>
                  <i
                    onClick={deleteTodo(todo.id)}
                    className="fa-solid fa-trash-can fa-sm is-flex is-align-items-center has-text-danger tl_todo-item-delete-button"
                  />
                  <Deadline
                    value={todo.deadline}
                    onChange={onDeadlineChange(todo.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
