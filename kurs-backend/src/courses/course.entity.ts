import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Enrollment } from '../enrollments/enrollment.entity'; 

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.courses)
  category: Category;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course, { 
  cascade: true, 
  onDelete: 'CASCADE' 
})
enrollments: Enrollment[];
}