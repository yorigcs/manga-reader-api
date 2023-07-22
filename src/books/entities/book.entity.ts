import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum BookType {
  MANGA = 'manga',
  MANHUA = 'manhua',
  MANHWA = 'manhwa',
}

export enum BookStatus {
  ONGOING = 'ongoing',
  PAUSED = 'paused',
  HIATUS = 'hiatus',
  DROPPED = 'dropped',
}
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  synopsis: string;
  @Column()
  author: string;
  @Column()
  image: string;
  @Column({ type: 'enum', enum: BookType })
  type: BookType;
  @Column({ type: 'enum', enum: BookStatus, default: BookStatus.ONGOING })
  status: BookStatus;
  @Column()
  postedBy: string;
  @CreateDateColumn()
  postedOn: Date;
  @UpdateDateColumn()
  updatedOn: Date;
}