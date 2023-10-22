import { useState, useRef, useContext, useMemo } from "react";

import { useLocation } from "wouter";

import { List } from "./list";

import { TodoContext } from "../../store/todo-list";

import { InputKeyboardEventHandler } from "../../types/types";

import "../../styles/todo-list/todo-modal.css";

interface TodoModal {
  params: { todoId: string };
}

export const TodoModal = ({ params }: TodoModal) => {
  const [, navigate] = useLocation();
  const { todos, dispatchAction } = useContext(TodoContext);
  const todo = useMemo(() => {
    if (!params?.todoId) return null;
    return todos.find((todo) => todo.id === params.todoId);
  }, [todos, params?.todoId]);

  const titleInputRef = useRef<HTMLInputElement>();
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const closeModal = () => navigate("/todo-list");

  const startTitleEditing = () => setIsTitleEditing(true);
  const cancelTitleEditing = () => setIsTitleEditing(false);
  const completeTitleEditing = () => {
    if (!titleInputRef.current) return;
    setIsTitleEditing(false);
    dispatchAction({
      type: "edit-todo",
      payload: {
        todoId: todo.id,
        key: "title",
        value: titleInputRef.current.value,
      },
    });
  };

  const onTitleKeyUp: InputKeyboardEventHandler = (event) => {
    if (event.key !== "Enter") return;
    completeTitleEditing();
  };

  const addNewTodoItem = () => {
    const todoItemId = dispatchAction({
      type: "create-todo-item",
      payload: {
        todoId: todo.id,
      },
    });
    setTimeout(() => {
      const todoItemInputEl = document.querySelector(
        `.modal input.tl_todo-item-${todoItemId}`
      ) as HTMLInputElement;
      todoItemInputEl?.focus();
    }, 0);
  };

  if (!todo) return null;

  return (
    <div className="modal is-active">
      <div onClick={closeModal} className="modal-background"></div>
      <div className="modal-card tl_modal-content">
        <header className="modal-card-head tl_modal-head">
          {isTitleEditing ? (
            <div className="modal-card-title tl_title">
              <input
                autoFocus
                ref={titleInputRef}
                defaultValue={todo.title}
                onKeyUp={onTitleKeyUp}
                placeholder="Enter your title here..."
                className="input is-small"
              />
              <div className="tl_title-actions">
                <button
                  onClick={completeTitleEditing}
                  className="button is-small is-success"
                >
                  <i className="fa-solid fa-check" />
                </button>
                <button
                  onClick={cancelTitleEditing}
                  className="button is-small is-danger"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>
          ) : (
            <p
              title={todo.title}
              onClick={startTitleEditing}
              className={`modal-card-title tl_title ${
                !todo.title ? "has-text-grey-light" : ""
              }`}
            >
              {todo.title || "Enter your title here..."}
            </p>
          )}
          <button
            onClick={closeModal}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body tl_modal-body pt-0">
          {todo && <List isReadOnly={false} todo={todo} />}
          <button
            onClick={addNewTodoItem}
            className="button is-primary is-fullwidth mt-4"
          >
            <i className="fa-solid fa-plus mr-2" />
            add new todo item
          </button>
        </section>
      </div>
    </div>
  );
};
