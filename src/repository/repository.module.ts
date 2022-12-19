import { Module } from '@nestjs/common';
import { PasswordRepository } from 'src/repository/password.repository';
import { SchemasModule } from 'src/schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  exports: [PasswordRepository],
  providers: [PasswordRepository],
})
export class RepositoryModule {}
