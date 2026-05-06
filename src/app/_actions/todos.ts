"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getUserOrThrow() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function addTodo(title: string) {
  const trimmed = title.trim();
  if (!trimmed) return;
  if (trimmed.length > 500) throw new Error("Title too long");

  const { supabase, user } = await getUserOrThrow();
  const { error } = await supabase
    .from("todos")
    .insert({ title: trimmed, user_id: user.id });
  if (error) throw error;
  revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
  const { supabase } = await getUserOrThrow();
  const { error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function renameTodo(id: string, title: string) {
  const trimmed = title.trim();
  if (!trimmed) {
    await removeTodo(id);
    return;
  }
  if (trimmed.length > 500) throw new Error("Title too long");

  const { supabase } = await getUserOrThrow();
  const { error } = await supabase
    .from("todos")
    .update({ title: trimmed })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeTodo(id: string) {
  const { supabase } = await getUserOrThrow();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}
