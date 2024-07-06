import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CharacterCreateDto {
  @IsNumber()
  public role: number

  @IsString()
  public name: string

  @IsString()
  public biography: string

  @IsString()
  public story: string

  @IsString()
  @IsOptional()
  public gender?: string

  @IsString()
  public difficulty: string

  @IsString()
  public height: string

  @IsString()
  @IsOptional()
  public dlc?: string

  @IsArray()
  @IsOptional()
  public perks?: string[]

  @IsOptional()
  public tunables?: object

  @IsOptional()
  public powerItem?: object
}

export class CharacterDto extends CharacterCreateDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  public _id: string
}

export class CharacterUpdateDto extends PartialType(CharacterCreateDto) {
}
