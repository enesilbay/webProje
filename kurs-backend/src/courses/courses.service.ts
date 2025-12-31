import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find({ relations: ['category'] });
  }

  async create(courseData: any) {
    const course = this.courseRepository.create({
      ...courseData,
      category: { id: courseData.categoryId }
    });
    return this.courseRepository.save(course);
  }

  async update(id: number, updateData: any) {
  const course = await this.courseRepository.findOneBy({ id });
  if (!course) throw new NotFoundException('Kurs bulunamadı');

  Object.assign(course, {
    title: updateData.title || course.title,
    description: updateData.description || course.description,
  });


  if (updateData.categoryId) {
    course.category = { id: Number(updateData.categoryId) } as any;
  }

  return this.courseRepository.save(course);
}

  async remove(id: number) {
    return this.courseRepository.delete(id);
  }
}