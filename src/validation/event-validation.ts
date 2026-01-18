import z from "zod";

export const createEventValidation = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    datetime: z.string().min(1, "Date and time are required"),
    location: z.string().min(1, "Location is required"),
});