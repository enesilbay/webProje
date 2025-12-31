import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async enroll(userId: any, courseId: any) {
  const uId = parseInt(userId, 10);
  const cId = parseInt(courseId, 10);

  console.log(`Gelen Veriler - User: ${uId}, Course: ${cId}`);

    if (isNaN(uId) || isNaN(cId)) {
      throw new BadRequestException('Geçersiz Kullanıcı veya Kurs ID bilgisi.');
    }

    try {
      const existing = await this.enrollmentRepository.findOne({
        where: { 
          user: { id: uId }, 
          course: { id: cId } 
        },
      });

      if (existing) {
        throw new BadRequestException('Bu kursa zaten kayıtlısınız.');
      }

      const newEnrollment = this.enrollmentRepository.create({
        user: { id: uId },
        course: { id: cId },
      });

      return await this.enrollmentRepository.save(newEnrollment);
    } catch (error) {
      console.error("Kayıt Hatası Detayı:", error);
      throw new InternalServerErrorException('Veritabanına kayıt yapılamadı.');
    }
  }

  async getUserEnrollments(userId: any) {
    const uId = Number(userId);
    return this.enrollmentRepository.find({
      where: { user: { id: uId } },
      relations: ['course', 'course.category'],
    });
  }

async unenroll(userId: number, courseId: number) {
  return this.enrollmentRepository.delete({
    user: { id: userId },
    course: { id: courseId },
  });
}

}