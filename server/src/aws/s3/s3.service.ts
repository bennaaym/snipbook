import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';

@Injectable()
export class S3Service {
  private buckerName: string;
  private s3: AWS.S3;

  constructor() {
    this.buckerName = 'snipbook';
    this.s3 = new AWS.S3({
      region: 'eu-west-2',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async generateUploadUrl() {
    const imageName = await crypto.randomBytes(16).toString('hex');
    const params = {
      Bucket: this.buckerName,
      Key: imageName,
      Expires: 60,
    };

    return await this.s3.getSignedUrl('putObject', params);
  }
}
