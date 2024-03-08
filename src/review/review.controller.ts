import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewBody } from './review.types';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session.decorator';
import supertokens from 'supertokens-node';
import { EventGateway } from 'src/gateway/event.gateway';
import { ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Review } from './review.model';

@Controller('/review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly eventGateway: EventGateway,
  ) {}

  @Get('/all')
  async getAll() {
    const reviews = await this.reviewService.findAll();
    return { reviews };
  }

  @ApiSecurity('basic')
  @ApiOperation({ operationId: 'createReview' })
  @ApiOkResponse({ type: Review })
  @Post('/create')
  @UseGuards(new AuthGuard())
  async create(
    @Session() session: SessionContainer,
    @Body() data: CreateReviewBody,
  ) {
    if (!session) throw new UnauthorizedException();
    const userId = session.getUserId();

    const userInfo = await supertokens.getUser(userId);
    const review = await this.reviewService.create(data);
    await this.eventGateway.emit('new_review', 'admin', userInfo.emails[0]);
    return review;
  }
}
