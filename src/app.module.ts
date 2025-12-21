import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { appConfig } from './configs/app.config';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
        configService.get('database') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    CoreModule,
    UserModule,
  ],
})
export class AppModule {}
