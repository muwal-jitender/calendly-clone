import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constant";
import { timeToInt } from "@/lib/utils";
import { z } from "zod";

export const scheduleFormSchema = z.object({
  timezone: z.string().min(1, "Required"),
  availabilities: z
    .array(
      z.object({
        daysOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
        startTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Time must be in the format HH:MM"
          ),
        endTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Time must be in the format HH:MM"
          ),
      })
    )
    .superRefine((availabilities, contextInfo) => {
      availabilities.forEach((availability, index) => {
        const overlaps = availabilities.some((nextRange, i) => {
          return (
            i !== index &&
            nextRange.daysOfWeek === availability.daysOfWeek &&
            timeToInt(nextRange.startTime) < timeToInt(availability.endTime) &&
            timeToInt(nextRange.endTime) > timeToInt(availability.startTime)
          );
        });
        if (overlaps) {
          contextInfo.addIssue({
            code: "custom",
            message: "Availability overlaps with another",
            path: [index],
          });
        }

        if (
          timeToInt(availability.startTime) > timeToInt(availability.endTime)
        ) {
          contextInfo.addIssue({
            code: "custom",
            message: "End time must be after start time",
            path: [index],
          });
        }
      });
    }),
});
