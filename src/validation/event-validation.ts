import z from "zod";
export const createEventValidation = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    datetime: z.string().min(1),
    location: z.string().min(1),
});
export const participantValidation = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    eventId: z.string().min(1),
});