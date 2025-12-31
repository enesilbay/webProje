import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: any) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async login(loginData: any) {
  const user = await this.userRepository.findOne({ where: { email: loginData.email } });
  if (user && user.password === loginData.password) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
  throw new UnauthorizedException('Giriş bilgileri hatalı');
}
}