import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getPoll(app: FastifyInstance){
    app.get('/polls/:pollId', async (request, reply) => {
        const getPollParams = z.object({  // passa quais propriedades são esperadas
            pollId: z.string().uuid(),
        })

        const { pollId } = getPollParams.parse(request.params)

        const poll = await prisma.poll.findUnique({ //operação no bd tem latencia >> logo deve-se usar promisses
          where: {
            id: pollId,
          },
          include:{
            options: {
                select: {
                id: true,
                title: true,
                }
            }
          }
        })

        return reply.send({ poll })
    })
}