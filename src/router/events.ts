import { Hono } from 'hono';
import { prisma } from '../utils/prisma.js';
import { zValidator } from "@hono/zod-validator";
import { createEventValidation } from '../validation/event-validation.js';

export const eventRoute = new Hono()
.get('/', async (c) => {
    const events = await prisma.event.findMany({
        include: {
            participants: true,
        },
    });
    return c.json({ events });
})
.get('/:id', async (c) => {
    const id = c.req.param('id');
    const event = await prisma.event.findFirst({
        where : {
            id: id,
        },
        include: {
            participants: true,
        },
    });
    return c.json({ event });
})
.post('/', zValidator("json", createEventValidation), async (c) => {
    const body = c.req.valid("json");

    const newEvent = await prisma.event.create({
        data: {
            name: body.name,
            description: body.description,
            datetime: body.datetime,
            location: body.location,
        },
    });

    return c.json({ event: newEvent });
})
.patch('/:id', zValidator("json", createEventValidation), async (c) => {
    const id = c.req.param('id');
    const body = c.req.valid("json");

    const updatedEvent = await prisma.event.update({
        where: {
            id: id,
            },
        data: {
            name: body.name,
            description: body.description,
            datetime: body.datetime,
            location: body.location,
        },
    });
    
    return c.json({ event: updatedEvent });
})
.delete('/:id', async (c) => {
    const id = c.req.param('id');

    const deletedEvent =  await prisma.event.delete({
        where: {
            id: id,
        },
    });
    return c.json({ message: `Event deleted successfully` });
});