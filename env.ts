/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  NOTION_API_KEY: Env.schema.string(),
  NOTION_MIDJOURNEY_SENTENCE_DB_ID: Env.schema.string(),
  DEEPL_API_KEY: Env.schema.string(),
  DISCORD_GUILD_ID: Env.schema.string(),
  DISCORD_APP_ID: Env.schema.string(),
  DISCORD_PUBLIC_KEY: Env.schema.string(),
  DISCORD_TOKEN: Env.schema.string(),
  S3_REGION: Env.schema.string(),
  S3_BUCKET_NAME: Env.schema.string(),
  S3_PUBLIC_KEY: Env.schema.string(),
  S3_PRIVATE_KEY: Env.schema.string(),
})
