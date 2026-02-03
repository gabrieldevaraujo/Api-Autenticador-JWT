export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'chave-padrao-desenvolvimento',
  expiresIn: 3600, // 1 hora em segundos
};