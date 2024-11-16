import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { formatEventDescription } from "@/lib/formatters";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BookingPage({
  params,
}: {
  params: { clerkUserId: string };
}) {
  // Access params
  const { clerkUserId } = params;

  console.log("Clerk User ID:", clerkUserId);

  // Fetch events from the database
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId: userIdCol, isActive }, { eq, and }) =>
      and(eq(userIdCol, clerkUserId), eq(isActive, true)),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  });

  // Handle case when no events are found
  if (!events || events.length === 0) {
    return notFound();
  }

  // Fetch user details from Clerk
  const user = await (await clerkClient()).users.getUser(clerkUserId);
  const fullName = user?.fullName || "Unknown User";

  // Return JSX
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-4xl md:text-5xl font-semibold mb-4 text-center">
        {fullName}
      </div>
      <div className="text-muted-foreground mb-6 max-w-sm mx-auto">
        Welcome to my scheduling page. Please follow the instructions to add an
        event to my calendar.
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill, minmax(300px, 1fr))]">
        <h1>Events</h1>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}

type EventCardProps = {
  id: string;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardTitle>{formatEventDescription(durationInMinutes)}</CardTitle>
      </CardHeader>
      {description != null && <CardContent>{description}</CardContent>}

      <CardFooter className="flex justify-end gap-2 mt-auto">
        <Button asChild>
          <Link href={`/book/${clerkUserId}/${id}`}>Select</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
