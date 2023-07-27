import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { Book } from '../../books/entities/book.entity'

@Entity()
@Unique(['chapterNum', 'bookId'])
export class Chapter {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    chapterNum: number

  @Column()
    chapterName: string

  @Column('simple-array')
    pagesImage: string[]

  @Column()
    bookId: number

  @Column()
    postedBy: string

  @CreateDateColumn()
    postedOn: Date

  @UpdateDateColumn()
    updatedOn: Date

  @ManyToOne(() => Book, (book) => book.chapters)
    book: Book
}
