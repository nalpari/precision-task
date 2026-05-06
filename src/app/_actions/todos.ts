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

function revalidateTodoRoutes() {
  revalidatePath("/");
  revalidatePath("/active");
}

// `Date#getTimezoneOffset()`는 UTC - local(분) 부호이므로
// 호출부에서 `-getTimezoneOffset()`을 보내면 local - UTC(분).
// 그 값을 created_at(UTC ms)에 더한 뒤 UTC* 메서드로 잘라 사용자
// 로컬 캘린더 일자 키를 얻는다 (Asia/Seoul = +540 등).
function localDayKey(iso: string, tzOffsetMinutes: number): string {
  const t = new Date(iso).getTime();
  const local = new Date(t + tzOffsetMinutes * 60_000);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, "0");
  const d = String(local.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
  revalidateTodoRoutes();
}

export async function toggleTodo(id: string, completed: boolean) {
  const { supabase } = await getUserOrThrow();
  const { error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id);
  if (error) throw error;
  revalidateTodoRoutes();
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
  revalidateTodoRoutes();
}

export async function removeTodo(id: string) {
  const { supabase } = await getUserOrThrow();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
  revalidateTodoRoutes();
}

// 같은-날짜-그룹 제약을 서버에서도 강제한다. 클라이언트가 SortableContext를
// 우회해 직접 호출하더라도 cross-group 이동은 차단된다.
// 사용자 로컬 TZ를 서버는 모르므로 호출부에서 `tzOffsetMinutes`를 전달한다
// (`-new Date().getTimezoneOffset()`).
export async function reorderTodo(
  id: string,
  prevId: string | null,
  nextId: string | null,
  tzOffsetMinutes: number,
) {
  if (id === prevId || id === nextId) return;
  if (prevId === null && nextId === null) return;
  if (!Number.isFinite(tzOffsetMinutes) || Math.abs(tzOffsetMinutes) > 14 * 60) {
    throw new Error("Invalid timezone offset");
  }

  const { supabase } = await getUserOrThrow();

  const ids = [id, ...(prevId ? [prevId] : []), ...(nextId ? [nextId] : [])];
  const { data: rows, error: fetchErr } = await supabase
    .from("todos")
    .select("id, created_at, position")
    .in("id", ids);
  if (fetchErr) throw fetchErr;
  if ((rows?.length ?? 0) !== ids.length) {
    throw new Error("Todo or sibling not found");
  }

  const byId = new Map(rows!.map((r) => [r.id, r] as const));
  const target = byId.get(id)!;
  const prev = prevId ? byId.get(prevId)! : null;
  const next = nextId ? byId.get(nextId)! : null;

  const targetDay = localDayKey(target.created_at, tzOffsetMinutes);
  if (prev && localDayKey(prev.created_at, tzOffsetMinutes) !== targetDay) {
    throw new Error("Cross-group reorder is not allowed");
  }
  if (next && localDayKey(next.created_at, tzOffsetMinutes) !== targetDay) {
    throw new Error("Cross-group reorder is not allowed");
  }

  let newPosition: number;
  if (prev !== null && next !== null) {
    newPosition = (prev.position + next.position) / 2;
  } else if (prev !== null) {
    newPosition = prev.position - 1;
  } else {
    newPosition = next!.position + 1;
  }

  const { error } = await supabase
    .from("todos")
    .update({ position: newPosition })
    .eq("id", id);
  if (error) throw error;
  revalidateTodoRoutes();
}
