import { IsOptional, IsString } from "class-validator"

export class FileDto {
  @IsString()
  @IsOptional()
  public path: string

  @IsString()
  @IsOptional()
  public name: string
}
