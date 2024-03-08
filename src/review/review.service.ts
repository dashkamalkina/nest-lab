import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.model';
import { Repository } from 'typeorm';
import { CreateReviewBody } from './review.types';

export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(data: CreateReviewBody) {
    return await this.reviewRepository.save(this.reviewRepository.create(data));
  }

  async findAll() {
    return await this.reviewRepository.find();
  }
}
