import { Injectable } from '@nestjs/common';
import { S3Service } from './s3/s3.service';

@Injectable()
export class AwsService {
  constructor(private readonly s3Service: S3Service) {}

  async getS3Url() {
    const signedUrl = await this.s3Service.generateUploadUrl();

    return {
      status: 'success',
      data: {
        s3Url: signedUrl,
      },
    };
  }
}
