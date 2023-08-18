import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto';
import { RedisService } from 'src/redis';
import { GoogleDto } from './dto';

type JWTPayload = {
  email: string;
  roleId: number;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisServide: RedisService,
  ) {}

  async getTokens(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET',
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(userDto: IUser) {
    const candidate = await this.userService.findOneByEmail(userDto.email);
    if (candidate) throw new HttpException('User with this email is exist', HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const createdUser = await this.userService.create({ ...userDto, password: hashedPassword });

    const tokens = await this.getTokens({ email: createdUser.email, roleId: createdUser.roleId });
    this.updateRefreshToken(createdUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

    const passwordsCompairing = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordsCompairing) throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

    const tokens = await this.getTokens({ email: user.email, roleId: user.roleId });
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(email: string, refreshToken: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !refreshToken)
      throw new HttpException('User does not exist', HttpStatus.FORBIDDEN);

    const currentRefreshToken = await this.redisServide.get(user.id);
    if (currentRefreshToken !== refreshToken)
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const tokens = await this.getTokens({ email: user.email, roleId: user.roleId });
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new HttpException('User does not exist', HttpStatus.FORBIDDEN);
    this.redisServide.delete(user.id);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.redisServide.set(id, refreshToken, 7 * 24 * 60 * 60);
  }

  async googleAuthentication(googleDto: GoogleDto): Promise<TokenResponse> {
    let user = await this.userService.findOneByEmail(googleDto.email);

    if (!user)
      user = await this.userService.create({
        id: 'sdsaf',
        firstName: googleDto.firstName,
        lastName: googleDto.lastName,
        birthdate: new Date(),
        email: googleDto.email,
        roleId: 1,
      });

    const tokens = await this.getTokens({ email: user.email, roleId: user.roleId });
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
