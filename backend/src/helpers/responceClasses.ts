import { ApiProperty } from '@nestjs/swagger';

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
