import { Module } from '@nestjs/common';
import { CommunityGateway } from './community.gateway';

@Module({
  providers: [CommunityGateway],
})
export class CommunityModule {}
