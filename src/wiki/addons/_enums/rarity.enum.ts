import { isString } from "radash"

export enum RarityEnum {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export const RarityList: RarityEnum[] = Object.keys(RarityEnum)
  .filter((key) => isString(RarityEnum[key]))
  .map((key) => RarityEnum[key])
