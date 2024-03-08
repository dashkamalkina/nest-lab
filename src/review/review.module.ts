import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.model';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { EventModule } from 'src/gateway/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), EventModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
