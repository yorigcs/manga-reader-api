import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
