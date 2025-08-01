// app/dashboard/page.tsx
import prisma, { auth } from "@/auth"; // server-side auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Box} from "@mui/material";

const DashboardClient = dynamic(() => import("./DashboardClient"));

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = await prisma.user.findUnique({
    where: {
      id: session?.user.id
    },
    select: {
      role: true
    }
  })
  if (!session) redirect("/sign-in");
  if (role?.role !== "seller") return (<Box sx={{
    maxWidth: "100%",
    margin: "15px",
    display: "flex",
    justifyContent: "center"
  }}>
    <Alert variant="destructive" className=" max-w-96">
      <AlertCircleIcon />
      <AlertTitle>
        Unautorize user
      </AlertTitle>
      <AlertDescription>
        <p>Hi {session.user.name} your are not suposed to be here</p>
        <p>your role now is not seller please make the seller account to acces this page</p>
      </AlertDescription>

    </Alert>
  </Box>)
  return <DashboardClient user={session.user} />;
}
