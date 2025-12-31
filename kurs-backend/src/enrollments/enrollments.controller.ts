import { Controller, Post, Get,Delete, Body, Param } from '@nestjs/common'; 
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Post('enroll') 
  async enroll(@Body() data: { userId: number; courseId: number }) {
    return this.enrollmentsService.enroll(data.userId, data.courseId);
  }

  @Get('my-courses/:userId') 
  async getMyCourses(@Param('userId') userId: number) { 
    return this.enrollmentsService.getUserEnrollments(userId);
  }

  @Delete('leave/:userId/:courseId')
async leaveCourse(@Param('userId') userId: number, @Param('courseId') courseId: number) {
  return this.enrollmentsService.unenroll(userId, courseId);
}



}