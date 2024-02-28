import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  async root() {
    return null;
  }

  @Get('/contacts')
  @Render('contacts')
  contacts() {
    return null;
  }

  @Get('/review_page')
  @Render('review_page')
  review() {
    return null;
  }

  @Get('/register')
  @Render('register')
  register() {
    return null;
  }

  @Get('/login')
  @Render('login')
  login() {
    return null;
  }
}
