"use server";

import "use-server";

import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema";

import { BatchItem } from "drizzle-orm/batch";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { scheduleFormSchema } from "@/schema/schedule";
import { z } from "zod";

export const saveSchedule = async (
  unsafeData: z.infer<typeof scheduleFormSchema>
) => {
  const { userId } = await auth();

  const { success, data } = scheduleFormSchema.safeParse(unsafeData);
  if (!success || userId == null) {
    return { error: true };
  }

  const { availabilities, ...scheduleData } = data;
  const [{ id: scheduleId }] = await db
    .insert(ScheduleTable)
    .values({ ...scheduleData, clerkUserId: userId })
    .onConflictDoUpdate({
      target: ScheduleTable.clerkUserId,
      set: scheduleData,
    })
    .returning({ id: ScheduleTable.id });

  const statements: [BatchItem<"pg">] = [
    db
      .delete(ScheduleAvailabilityTable)
      .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId)),
  ];

  if (availabilities.length > 0) {
    statements.push(
      db.insert(ScheduleAvailabilityTable).values(
        availabilities.map((item) => ({
          ...item,
          scheduleId,
        }))
      )
    );
  }
  await db.batch(statements);
};
