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

// 같은-날짜-그룹 제약은 클라이언트 SortableContext가 차단한다.
// 서버는 RLS + getUserOrThrow로 본인 todo만 다루도록 보장하고,
// 두 형제의 position 사이값(없으면 ±1)으로 fractional position을 계산한다.
export async function reorderTodo(
  id: string,
  prevId: string | null,
  nextId: string | null,
) {
  if (id === prevId || id === nextId) return;
  if (prevId === null && nextId === null) return;

  const { supabase } = await getUserOrThrow();

  const siblingIds = [prevId, nextId].filter((v): v is string => v !== null);
  const { data: rows, error: fetchErr } = await supabase
    .from("todos")
    .select("id, position")
    .in("id", siblingIds);
  if (fetchErr) throw fetchErr;
  if ((rows?.length ?? 0) !== siblingIds.length) {
    throw new Error("Sibling not found");
  }

  const byId = new Map(rows!.map((r) => [r.id, r.position] as const));
  const prevPos = prevId ? byId.get(prevId)! : null;
  const nextPos = nextId ? byId.get(nextId)! : null;

  let newPosition: number;
  if (prevPos !== null && nextPos !== null) {
    newPosition = (prevPos + nextPos) / 2;
  } else if (prevPos !== null) {
    newPosition = prevPos - 1;
  } else {
    newPosition = nextPos! + 1;
  }

  const { error } = await supabase
    .from("todos")
    .update({ position: newPosition })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}
