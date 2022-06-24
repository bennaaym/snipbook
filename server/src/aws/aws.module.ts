import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { S3Service } from './s3/s3.service';

@Module({
  controllers: [AwsController],
  providers: [AwsService, S3Service],
})
export class AwsModule {}
