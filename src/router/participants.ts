import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import z from "zod";
import { participantValidation } from "../validation/event-validation.js";
import { zValidator } from "@hono/zod-validator";

export const participantsRoute = new Hono().get("/", (c) => {
    return c.json({participants:[]});
})
.get("/", (c) => {
    return c.json({participants:[]});
})
.get("/:id", (c) => {
    const { id } = c.req.param();
    return c.json({participant:id});
})
.post("/", zValidator("json", participantValidation), async (c) => {
    const body = c.req.valid("json");

        const newParticipant = await prisma.participant.create({
            data: {
                name: body.name,
                email: body.email,
                eventId: body.eventId,
            }
        });

    return c.json({participant: newParticipant});
})
.patch("/:id", (c) => {
    const { id } = c.req.param();
    return c.json({participant: id});
})
.delete("/:id", (c) => {
    const { id } = c.req.param();
    return c.json({participant: id});
});