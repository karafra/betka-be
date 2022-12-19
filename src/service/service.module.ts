import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { PasswordService } from 'src/service/password.service';

@Module({
  imports: [RepositoryModule],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class ServiceModule {}
