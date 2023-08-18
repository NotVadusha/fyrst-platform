import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RefreshDto } from './dto';
import { RedisService } from 'src/redis';
import { GoogleDto } from './dto';
import { v4 as uuid } from 'uuid';

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
    private redisService: RedisService,
  ) {}

  async getTokens(payload: JWTPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = uuid();
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

  async refresh(refreshDto: RefreshDto) {
    const user = await this.userService.findOneByEmail(refreshDto.email);
    if (!user || !refreshDto.refreshToken)
      throw new HttpException('User does not exist', HttpStatus.FORBIDDEN);

    const currentRefreshToken = await this.redisService.get(user.id);
    if (currentRefreshToken !== refreshDto.refreshToken)
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const tokens = await this.getTokens({ email: user.email, roleId: user.roleId });
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new HttpException('User does not exist', HttpStatus.FORBIDDEN);
    this.redisService.delete(user.id);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.redisService.set(id, refreshToken, 7 * 24 * 60 * 60);
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
