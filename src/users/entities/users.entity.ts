import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity("User") // 테이블 명 설정 
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn()
  userId: string;
  @Column()
  nickName: string;
  @Column()
  password: string;
  @Column({ default: true })
  status : string;
}
