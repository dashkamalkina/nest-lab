import { Get, Controller, Render, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import supertokens from 'supertokens-node';
import { ReviewService } from './review/review.service';

@Controller()
export class AppController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  @UseGuards(new AuthGuard())
  @Render('index')
  async root(@Session() session: SessionContainer) {
    if (session) {
      const userId = session.getUserId();

      const userInfo = await supertokens.getUser(userId);
      console.log(userInfo);
      return {
        user: {
          id: userInfo.id,
          mail: userInfo.emails[0],
        },
      };
    }
    return { user: null };
  }

  @Get('/contacts')
  @Render('contacts')
  @UseGuards(new AuthGuard())
  async contacts(@Session() session: SessionContainer) {
    const reviews = await this.reviewService.findAll();

    if (session) {
      const userId = session.getUserId();

      const userInfo = await supertokens.getUser(userId);
      return {
        user: {
          id: userInfo.id,
          mail: userInfo.emails[0],
        },
        reviews,
      };
    }

    return { user: null, reviews };
  }

  @Get('/review_page')
  @Render('review_page')
  @UseGuards(new AuthGuard())
  async review(@Session() session: SessionContainer) {
    const reviews = await this.reviewService.findAll();

    if (session) {
      const userId = session.getUserId();

      const userInfo = await supertokens.getUser(userId);
      return {
        user: {
          id: userInfo.id,
          mail: userInfo.emails[0],
        },
        reviews,
      };
    }

    return { user: null, reviews };
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
