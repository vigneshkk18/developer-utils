import { useContext } from "react";

import { useLocation } from "wouter";

import { TodoContext } from "../../store/todo-list";

import { SortBy } from "../../types/todo-list";

export const TodoActions = () => {
  const [, navigate] = useLocation();
  const { sortBy, dispatchAction, changeSortBy } = useContext(TodoContext);

  const openTodoModal = () => {
    const newTodoId = dispatchAction({
      type: "create-todo",
    });
    navigate("/todo-list/" + newTodoId);
  };

  const onSort = (sortBy: SortBy) => () => {
    changeSortBy(sortBy);
  };

  return (
    <div className="is-flex is-justify-content-space-between">
      <div className="field has-addons mb-0">
        <span className="is-size-5 is-flex is-align-items-center has-text-weight-bold mr-4">
          Sort By
        </span>
        <p className="control">
          <button
            onClick={onSort("title")}
            className={`button ${sortBy === "title" ? "is-primary" : ""}`}
          >
            <span className="icon is-small">
              <i className="fas fa-heading"></i>
            </span>
            <span>Title</span>
          </button>
        </p>
        <p className="control">
          <button
            onClick={onSort("deadline")}
            className={`button ${sortBy === "deadline" ? "is-danger" : ""}`}
          >
            <span className="icon is-small">
              <i
                className={`fa-solid fa-clock ${
                  sortBy === "deadline" ? "has-text-white" : "has-text-danger"
                }`}
              ></i>
            </span>
            <span>Deadline</span>
          </button>
        </p>
      </div>
      <button onClick={openTodoModal} className="button is-primary">
        <span className="icon is-small">
          <i className="fa-solid fa-plus" />
        </span>
        <span>New Todo List</span>
      </button>
    </div>
  );
};
