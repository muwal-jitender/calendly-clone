import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  addMonths,
  eachMinuteOfInterval,
  endOfDay,
  roundToNearestMinutes,
} from "date-fns";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";
import { notFound } from "next/navigation";

export default async function BookEventPage({
  params,
}: {
  params: { clerkUserId: string; eventId: string };
}) {
  const { clerkUserId, eventId } = params;

  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  const calendarUser = await (await clerkClient()).users.getUser(clerkUserId);

  const startDate = roundToNearestMinutes(new Date(), {
    nearestTo: 15,
    roundingMethod: "ceil",
  });
  const endDate = endOfDay(addMonths(startDate, 2));
  const intervals = eachMinuteOfInterval(
    { start: startDate, end: endDate },
    { step: 15 }
  );
  const validTimes = await getValidTimesFromSchedule(intervals, event);
  console.log("Filtered Valid Times:", validTimes);

  if (validTimes.length !== 0) {
    return <NoTimeSlots event={event} calendarUser={calendarUser} />;
  }
  return <h1>Hi</h1>;
}

function NoTimeSlots({
  event,
  calendarUser,
}: {
  event: { name: string; description: string | null };
  calendarUser: { id: string; fullName: string | null };
}) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          Book {event.name} with {calendarUser.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {calendarUser.fullName} is currently booked up. Please check back later
        or choose a shorter event.
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/book/${calendarUser.id}`}>Choose Another Event</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
