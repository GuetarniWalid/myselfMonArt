import Env from '@ioc:Adonis/Core/Env'
import * as deepl from 'deepl-node'

export class Deepl {
  private translator: deepl.Translator

  constructor() {
    const API_KEY = Env.get('DEEPL_API_KEY')
    this.translator = new deepl.Translator(API_KEY)
  }

  public async translateText({ pageId, text }: { pageId: string; text: string }) {
    try {
      const { text: textTranslated } = await this.translator.translateText(text, 'fr', 'en-US')
      return { pageId, textTranslated }
    } catch (error) {
      console.error(error)
    }
  }

  public async translateTexts(textsToTranslate: { pageId: string; text: string }[]) {
    try {
      const textsTranslatedPromises = textsToTranslate.map(async (textToTranslate) => {
        return this.translateText(textToTranslate)
      })
      return await Promise.all(textsTranslatedPromises)
    } catch (error) {
      console.error(error)
    }
  }
}
