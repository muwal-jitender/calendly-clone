import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";

export const revalidate = 0;

export default async function SchedulePage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) {
    return redirectToSignIn();
  }
  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: {
      availabilities: true,
    },
  });
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule Event</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  );
}
