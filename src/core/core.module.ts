import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import loadConfig from './config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [
        `.${process.env.NODE_ENV || 'development'}.local.env`,
        `.${process.env.NODE_ENV || 'development'}.env`,
        '.env',
      ],
      load: loadConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
