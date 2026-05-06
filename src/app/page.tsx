import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Todo } from "@/types/todo";
import TodoListClient from "./_components/TodoListClient";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("position", { ascending: false });

  if (error) throw error;

  return (
    <TodoListClient
      initial={(data ?? []) as Todo[]}
      userEmail={user.email ?? null}
    />
  );
}
