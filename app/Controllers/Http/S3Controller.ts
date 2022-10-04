import aws from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'
const ShortUniqueId = require('short-unique-id')

const region = Env.get('S3_REGION')
const bucketName = Env.get('S3_BUCKET_NAME')
const accessKeyId = Env.get('S3_PUBLIC_KEY')
const secretAccessKey = Env.get('S3_PRIVATE_KEY')
const uid = new ShortUniqueId({ length: 10 })

export default class S3Controller {
  public async getCredential() {
    const s3 = new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
    })

    const params = {
      Bucket: bucketName,
      Key: uid(),
      Expires: 60,
      ContentType: 'image/jpeg',
    }

    const url = s3.getSignedUrl('putObject', params)
    return { url }
  }
}
