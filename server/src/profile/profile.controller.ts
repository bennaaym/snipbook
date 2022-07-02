import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:id')
  getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfileById(id);
  }
}
