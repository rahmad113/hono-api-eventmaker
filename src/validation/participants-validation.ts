import z from "zod";

export const createParticipantValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    eventId: z.string().min(1, "Event ID is required"),
});