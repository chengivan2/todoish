import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SignOutButton from "../components/SignOutButton";
import Authentication from "./Authentication";
import { syncUser } from "@/lib/db";

export default async function DashboardPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = authenticated ? await getUser() : null;
  
  if (!authenticated) {
    return <Authentication />;
  }

  // Sync user data with our database
  await syncUser(user);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user.given_name || user.email}</p>
      <SignOutButton />
    </>
  );
}
