import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupValidation } from './validation/auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() validation: SignupValidation) {
    return this.authService.signup(validation);
  }

  @Post('signin')
  signin() {
    return 'Sign in call';
  }
}
