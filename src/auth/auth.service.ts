import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  // Usuários simulados (sem banco de dados por enquanto)
  private users = [
    { id: 1, email: 'joao@example.com', password: '123456' },
    { id: 2, email: 'maria@example.com', password: '654321' },
  ];

  constructor(private jwtService: JwtService) {}

  login(dto: AuthDto) {
  const user = this.users.find(u => u.email === dto.email);

  if (!user) {
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  if (user.password !== dto.password) {
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  // Gerar o JWT
  const payload = { sub: user.id, email: user.email };
  const access_token = this.jwtService.sign(payload);

  // Retornar com o token
  return {
    id: user.id,
    email: user.email,
    access_token: access_token,
    message: 'Login realizado com sucesso',
  };
}

  register(dto: AuthDto) {
  const userExists = this.users.find(u => u.email === dto.email);

  if (userExists) {
    throw new BadRequestException('Email já cadastrado');
  }

  const newUser = {
    id: this.users.length + 1,
    email: dto.email,
    password: dto.password,
  };

  this.users.push(newUser);

  // Gerar JWT para o novo usuário
  const payload = { sub: newUser.id, email: newUser.email };
  const access_token = this.jwtService.sign(payload);

  return {
    id: newUser.id,
    email: newUser.email,
    access_token: access_token,
    message: 'Usuário cadastrado com sucesso',
  };
}
}