import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
const axios = require('axios').default

export default class DiscordsController {
  public async index({ request }: HttpContextContract) {
    const { type } = request.body()
    switch (type) {
      case InteractionType.PING:
        return { type: 1 }
      case InteractionType.APPLICATION_COMMAND:
        axios({
          method: 'get',
          url: 'https://discord.com/api/channels/1022457321961558101/messages',
          headers: {
            authorization: 'NDczMzg2OTYzMzUzOTkzMjI2.GXw9Y1.VWAL0vu2c7jeaupnQ054pP8ydgHahjBOamhTsw',
          },
        })
          .then((res) => {
            console.log(res.data)
          })
          .catch((e) => console.log(e))
        return {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '/imagine prompt: a black woman',
          },
        }
      default:
        return 'wrong type'
    }
  }
}
