import type { Todo } from "@/types/todo";

export type TodoAction =
  | { kind: "add"; todo: Todo }
  | { kind: "toggle"; id: string; completed: boolean }
  | { kind: "rename"; id: string; title: string }
  | { kind: "remove"; id: string }
  | {
      kind: "reorder";
      id: string;
      prevId: string | null;
      nextId: string | null;
    };

export function reduce(state: Todo[], action: TodoAction): Todo[] {
  switch (action.kind) {
    case "add":
      return [action.todo, ...state];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: action.completed } : todo,
      );
    case "rename":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.id);
    case "reorder": {
      const moving = state.find((t) => t.id === action.id);
      if (!moving) return state;
      const without = state.filter((t) => t.id !== action.id);
      const prevPos = action.prevId
        ? (without.find((t) => t.id === action.prevId)?.position ?? null)
        : null;
      const nextPos = action.nextId
        ? (without.find((t) => t.id === action.nextId)?.position ?? null)
        : null;
      let newPosition: number;
      if (prevPos !== null && nextPos !== null)
        newPosition = (prevPos + nextPos) / 2;
      else if (prevPos !== null) newPosition = prevPos - 1;
      else if (nextPos !== null) newPosition = nextPos + 1;
      else newPosition = moving.position;
      const updated = { ...moving, position: newPosition };
      return [...without, updated].sort((a, b) => b.position - a.position);
    }
  }
}
