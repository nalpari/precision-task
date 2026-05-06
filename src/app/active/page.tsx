import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Todo } from "@/types/todo";
import ActiveDashboardClient from "../_components/ActiveDashboardClient";

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
    <ActiveDashboardClient
      initial={(data ?? []) as Todo[]}
      userEmail={user.email ?? null}
    />
  );
}
