import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Course } from './courses/course.entity';
import { Category } from './categories/category.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_jJC5t1DOfWKF@ep-blue-queen-adjc32wt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
      entities: [User, Course, Category, Enrollment], 
      synchronize: true, 
    }),
    UsersModule,
    CoursesModule,
    CategoriesModule,
    EnrollmentsModule,
    AuthModule,
  ],
})
export class AppModule {}