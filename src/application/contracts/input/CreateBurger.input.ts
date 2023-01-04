import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBurgerInput {
  @Transform(({ value }) => String(value).toUpperCase())
  @IsString()
  @IsNotEmpty()
  customer: string;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  patties = 1;
}
