import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator"
import { ItemParentsPartDto } from "./_parts/item-parents.part.dto"
import { Type } from "class-transformer"
import { RarityEnum, RarityList } from "../_enums/rarity.enum"

export class AddonCreateDto {
  @IsString()
  @ApiProperty({ type: String })
  public name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  public description?: string

  @IsEnum(RarityList)
  @ApiProperty({ type: String, enum: RarityList })
  public ratity?: RarityEnum

  @IsArray()
  @IsOptional()
  @Type(() => ItemParentsPartDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [ItemParentsPartDto] })
  public itemParents?: ItemParentsPartDto[]
}

export class AddonDto extends AddonCreateDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  public _id: string
}

export class AddonUpdateDto extends PartialType(AddonCreateDto) {
}
