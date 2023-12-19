import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  @IsEnum(['AK47', 'M4A4', 'AWP'], {
    message: 'Only AK47 and M4A4 AND AWP are supported',
  })
  weapon: string;
  id: number;
}
