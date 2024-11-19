import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId != null) {
    redirect("/events");
  }
  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Scheduling Made Simple</h1>
      <h2 className="text-2xl mb-4">
        Log in to access your events or sign up to simplify your meeting
        management.
      </h2>
      <div className="flex gap-2 justify-center">
        <Button asChild>
          <SignInButton />
        </Button>
        <Button asChild>
          <SignUpButton></SignUpButton>
        </Button>
        <UserButton></UserButton>
      </div>
    </div>
  );
}
