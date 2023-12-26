import { IsNotEmpty, IsInt } from 'class-validator';
export class AgeDto {
  @IsNotEmpty()
  @IsInt()
  age: number;
}
