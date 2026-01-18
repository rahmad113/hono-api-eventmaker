import { Hono } from 'hono';
import { prisma } from '../utils/prisma.js';
import { zValidator } from '@hono/zod-validator';
import { createParticipantValidation } from '../validation/participants-validation.js';

export const participantsRoute = new Hono()
.get('/', async (c) => {
    const participants = await prisma.participant.findMany();
    return c.json({ participants: participants });
})
.get('/:id', async (c) => {
    const id = c.req.param('id');
    const participant = await prisma.participant.findFirst({
        where: {
            id: id,
        },
    });
    return c.json({ participant: participant });
})
.post('/',zValidator("json", createParticipantValidation), async (c) => {
    const body = c.req.valid("json");
    
    const newParticipant = await prisma.participant.create({
        data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId,
        },
    });

    return c.json({ participant: newParticipant });
})
.patch('/:id', zValidator("json", createParticipantValidation), async (c) => {
    const id = c.req.param('id');
    const body = c.req.valid("json");
    const updatedParticipant = await prisma.participant.update({
        where: {
            id: id,
        },
        data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId,
        },
    });
    return c.json({ participant: updatedParticipant });
})
.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const deletedParticipant = await prisma.participant.delete({
        where: {
            id: id,
        },
    });
    return c.json({ message: `Participant ${id} deleted` });
});