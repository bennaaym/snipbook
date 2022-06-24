import { Controller, Get, UseGuards } from '@nestjs/common';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get('/s3')
  getS3Url() {
    return this.awsService.getS3Url();
  }
}
