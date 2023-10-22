export interface TodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  createdTime: string;
  updatedTime: string;
}

export interface Todo {
  id: string;
  title: string;
  todos: TodoItem[];
  deadline: string | null;
  createdTime: string;
  updatedTime: string;
}

export type SortBy = keyof Todo | "none";

type ActionArgs =
  | { type: "create-todo"; payload?: undefined }
  | { type: "delete-todo"; payload: { todoId: string } }
  | {
      type: "edit-todo";
      payload: { todoId: string; key: keyof Todo; value: Todo[keyof Todo] };
    }
  | {
      type: "set-todo";
      payload: { todo: Todo };
    }
  | {
      type: "create-todo-item";
      payload: { todoId: string };
    }
  | {
      type: "delete-todo-item";
      payload: { todoId: string; todoItemId: string };
    }
  | {
      type: "edit-todo-item";
      payload: {
        todoId: string;
        todoItemId: string;
        key: keyof TodoItem;
        value: TodoItem[keyof TodoItem];
      };
    };

export type Action = (args: ActionArgs) => string | void;
