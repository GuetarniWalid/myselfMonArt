import { Client } from '@notionhq/client'
import Env from '@ioc:Adonis/Core/Env'

export class Notion {
  private notion = new Client({ auth: Env.get('NOTION_API_KEY') })
  private columnNameToTranslate = 'Vous voulez quoi ?'
  private columnNameTextTranslated = 'What do you want ?'
  private columnNameTranslationActivate = 'Traduire ?'
  private databaseId = Env.get('NOTION_MIDJOURNEY_SENTENCE_DB_ID')

  public async getTextsToTranslate() {
    try {
      const { results } = await this.notion.databases.query({
        database_id: this.databaseId,
        filter: {
          and: [
            {
              property: this.columnNameToTranslate,
              rich_text: {
                is_not_empty: true,
              },
            },
            {
              property: this.columnNameTextTranslated,
              rich_text: {
                is_empty: true,
              },
            },
            {
              property: this.columnNameTranslationActivate,
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      })

      return results.map((result) => {
        return {
          pageId: result.id,
          // @ts-ignore
          text: result.properties[this.columnNameToTranslate].title[0].plain_text as string,
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  public async updateTextTranslated({
    pageId,
    textTranslated,
  }: {
    pageId: string
    textTranslated: string
  }) {
    try {
      await this.notion.pages.update({
        page_id: pageId,
        properties: {
          [this.columnNameTextTranslated]: {
            rich_text: [
              {
                text: {
                  content: textTranslated,
                },
              },
            ],
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  public async updateTextsTranslated(
    textsTranslated: { pageId: string; textTranslated: string }[]
  ) {
    try {
      const updateTextTranslatedPromises = textsTranslated.map(async (textTranslated) => {
        return this.updateTextTranslated(textTranslated)
      })
      await Promise.all(updateTextTranslatedPromises)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}
