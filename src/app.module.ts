import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllerModule } from 'src/controller/controller.module';
import { PasswordController } from 'src/controller/password.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { SchemasModule } from 'src/schemas/schemas.module';
import loader from './config/loader';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loader],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.connection.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    SchemasModule,
    RepositoryModule,
    ControllerModule,
  ],
  controllers: [PasswordController],
})
export class AppModule {}
