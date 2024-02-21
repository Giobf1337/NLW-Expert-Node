import fastify from "fastify"; 
import { createPoll } from "./routes/create-poll";

const app = fastify()

app.register(createPoll)


app.listen({ port: 5555 }).then(() => {
    console.log('HTTP server running!');
})