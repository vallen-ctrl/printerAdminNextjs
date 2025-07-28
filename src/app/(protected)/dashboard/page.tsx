// app/dashboard/page.tsx
import { auth } from "@/auth"; // server-side auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("./DashboardClient"));

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  return <DashboardClient user={session.user} />;
}
