export type Todo = {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  position: number;
};

export type TodoFilter = "all" | "active" | "completed";
