import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'super',
      database: process.env.DB_DATABASE || 'nestApi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Apenas em desenvolvimento, não use em produção
    }),
    UserModule,
  ],
})
export class AppModule {}
