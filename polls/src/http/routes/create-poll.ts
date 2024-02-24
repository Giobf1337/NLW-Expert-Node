import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createPoll(app: FastifyInstance){
    app.post('/polls', async (request, reply) => {
        const createPollBody = z.object({  // passa quais propriedades são esperadas
            title: z.string(),
            options: z.array(z.string()),
        })

        const { title, options } = createPollBody.parse(request.body)

        const poll = await prisma.poll.create({ //operação no bd tem latencia >> logo deve-se usar promisses
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map(option =>{
                            return { title: option }
                        })
                    }
                }
            }
        })

        return reply.status(201).send({ pollID: poll.id })
    })
}