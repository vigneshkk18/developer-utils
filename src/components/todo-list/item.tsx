import { Draggable } from "react-beautiful-dnd";

import { Checkbox } from "../checkbox";

import { TodoItem } from "../../types/todo-list";

import "../../styles/todo-list/item.css";

interface Item {
  index: number;
  todo: TodoItem;
  isReadOnly: boolean;
  isDraggable?: boolean;
  onCompletedChange: (id: string, isCompleted: boolean) => void;
  onTodoTextChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const Item = ({
  todo,
  index,
  isReadOnly,
  isDraggable = true,
  onTodoTextChange,
  onCompletedChange,
  onDelete,
}: Item) => {
  return (
    <Draggable
      key={todo.id}
      draggableId={todo.id}
      isDragDisabled={!isDraggable || isReadOnly}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="field is-grouped tl_todo-item"
        >
          {!isReadOnly && (
            <div
              className={`is-flex is-align-items-center pr-4 ${
                isDraggable ? "" : "faded"
              }`}
              {...provided.dragHandleProps}
            >
              <i className="fa-solid fa-grip-vertical" />
            </div>
          )}
          <Checkbox
            disabled={isReadOnly}
            onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
            checked={todo.isCompleted}
            className="tl_checkbox"
          />
          <input
            value={todo.text}
            onChange={(e) => onTodoTextChange(todo.id, e.target.value)}
            className={`input is-size-6 is-small is-static px-2 tl_todo-item-${
              todo.id
            } ${todo.isCompleted ? "tl_todo-item-completed" : ""}`}
            type="text"
          />
          {!isReadOnly && (
            <button
              onClick={() => onDelete(todo.id)}
              className="button has-text-danger is-light is-small"
            >
              <i className="fa-solid fa-trash" />
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};
