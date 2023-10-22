import { useContext } from "react";

import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import { Item } from "./item";

import { TodoContext } from "../../store/todo-list";

import { Todo } from "../../types/todo-list";

import "../../styles/todo-list/list.css";

interface List {
  todo: Todo;
  isReadOnly: boolean;
}

export const List = ({ isReadOnly, todo }: List) => {
  const { dispatchAction } = useContext(TodoContext);

  const onCompletedChange = (id: string, isCompleted: boolean) => {
    dispatchAction({
      type: "edit-todo-item",
      payload: {
        key: "isCompleted",
        todoItemId: id,
        value: isCompleted,
        todoId: todo.id,
      },
    });
  };

  const onTodoTextChange = (id: string, text: string) => {
    dispatchAction({
      type: "edit-todo-item",
      payload: {
        key: "text",
        todoItemId: id,
        value: text,
        todoId: todo.id,
      },
    });
  };

  const onTodoItemDelete = (todoItemId: string) => {
    dispatchAction({
      type: "delete-todo-item",
      payload: {
        todoItemId,
        todoId: todo.id,
      },
    });
  };

  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (source.index === destination.index) return;
    const isAbove = destination.index < source.index;
    const updatedTodos = [...todo.todos];
    const sourceTodoItem = todo.todos[source.index];
    for (
      let i = source.index;
      isAbove ? i > destination.index : i < destination.index;
      isAbove ? i-- : i++
    ) {
      updatedTodos[i] = updatedTodos[isAbove ? i - 1 : i + 1];
    }
    updatedTodos[destination.index] = sourceTodoItem;
    dispatchAction({
      type: "set-todo",
      payload: { todo: { ...todo, todos: updatedTodos } },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todo.todos.map((todoItem, idx) => (
              <Item
                isReadOnly={isReadOnly}
                key={todoItem.id}
                todo={todoItem}
                index={idx}
                onCompletedChange={onCompletedChange}
                onTodoTextChange={onTodoTextChange}
                onDelete={onTodoItemDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
