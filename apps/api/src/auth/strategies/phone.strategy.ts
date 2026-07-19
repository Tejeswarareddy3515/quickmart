import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, 'phone') {
  constructor() {
    super();
  }
}