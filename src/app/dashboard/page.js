import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";

export default async function DashboardPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.given_name || user.email}</p>
      <SignOutButton />
    </div>
  );
}
