import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommunityModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
