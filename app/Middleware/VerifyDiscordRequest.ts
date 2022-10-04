import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { verifyKey } from 'discord-interactions'
import Env from '@ioc:Adonis/Core/Env'

export default class VerifyDiscordRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const signature = request.header('x-signature-ed25519')
    const timestamp = request.header('X-Signature-Timestamp')
    const isValidRequest = verifyKey(
      request.raw()!,
      signature!,
      timestamp!,
      Env.get('DISCORD_PUBLIC_KEY')
    )
    if (!isValidRequest) {
      response.status(401).send('Bad request signature')
      throw new Error('Bad request signature')
    }
    await next()
  }
}
