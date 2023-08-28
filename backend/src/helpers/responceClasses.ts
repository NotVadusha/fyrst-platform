import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/packages/user/entities/user.entity';

export class MessageResponse {
  @ApiProperty({ example: 'Something went wrong', description: 'Text with some message' })
  message: string;
}

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyNjI0ODgyLCJleHAiOjE2OTI2MjUxODJ9.Zvx65Mb-h2ZRRGbg7TApGnIqB5-DX3d6eoQ_D7tkii0',
    description: 'JWT access token',
  })
  accessToken: string;
  @ApiProperty({
    example: '538a17dc-df88-4e27-973b-6e1bf48263dc',
    description: 'Unique token(UUID)',
  })
  refreshToken: string;
}

export class SignInResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyNjI0ODgyLCJleHAiOjE2OTI2MjUxODJ9.Zvx65Mb-h2ZRRGbg7TApGnIqB5-DX3d6eoQ_D7tkii0',
    description: 'JWT access token',
  })
  accessToken: string;
  @ApiProperty({
    example: '538a17dc-df88-4e27-973b-6e1bf48263dc',
    description: 'Unique token(UUID)',
  })
  refreshToken: string;
  @ApiProperty({
    example: {
      id: 1,
      first_name: 'Ivan',
      last_name: 'Ivanov',
      email: 'qwerty@gmail.com',
      role_id: 1,
    },
    description: 'User information',
  })
  userInfo: Partial<User>;
}
