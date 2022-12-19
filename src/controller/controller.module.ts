import { Module } from '@nestjs/common';
import { OptionsController } from 'src/controller/options.controller';
import { PasswordController } from 'src/controller/password.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [ServiceModule, RepositoryModule],
  controllers: [PasswordController, OptionsController],
})
export class ControllerModule {}
