import { BaseTask } from 'adonis5-scheduler/build'
import { Notion } from 'Utils/Notion'
import { Deepl } from 'Utils/Deepl'

export default class TranslateNotionSentence extends BaseTask {
  private notion = new Notion()
  private deepl = new Deepl()

  public static get schedule() {
    return '*/2 * * * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    try {
      const textstoTranslate = await this.notion.getTextsToTranslate()
      if (!textstoTranslate || textstoTranslate.length === 0) return
      const textsTranslated = await this.deepl.translateTexts(textstoTranslate)
      if (!textsTranslated || textsTranslated.length === 0) return
      //@ts-ignore
      await this.notion.updateTextsTranslated(textsTranslated)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}
