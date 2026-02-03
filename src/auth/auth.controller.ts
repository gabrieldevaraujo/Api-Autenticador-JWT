import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(ValidationPipe) dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body(ValidationPipe) dto: AuthDto) {
    return this.authService.register(dto);
  }

  // Nova rota protegida com JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return {
      message: 'Perfil do usuário',
      user: req.user,
    };
  }
}