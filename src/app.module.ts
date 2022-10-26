import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/entities/users.entity'
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.c2sefgskvqh3.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'Kjoy2357**',
      database: 'Carrot',
      entities: [User], // 생성한 entity 를 넣어준다.
      synchronize: false, // synchoronize true 설정은 db 가 초기화된다고 하는데 why 정리하기
    }),
    UsersModule
  ],
  // controllers: [UsersController],
  // providers: [UsersService],
})
export class AppModule {}
