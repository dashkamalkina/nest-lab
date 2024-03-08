import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(10)
  rate: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
