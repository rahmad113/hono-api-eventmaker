import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { eventRoute } from './router/events.js'
import { participantsRoute } from './router/participants.js'

const app = new Hono()
app.get('/', (c) => {
  return c.json('Welcome, the following endpoints are available: /events and /participants')
});
app.route("/events", eventRoute)
app.route("/participants", participantsRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
