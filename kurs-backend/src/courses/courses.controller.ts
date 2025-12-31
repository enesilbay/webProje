import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('list')
  findAll() {
    return this.coursesService.findAll();
  }

  @Post('add')
  create(@Body() courseData: any) {
    return this.coursesService.create(courseData);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: any) {
    return this.coursesService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }
}