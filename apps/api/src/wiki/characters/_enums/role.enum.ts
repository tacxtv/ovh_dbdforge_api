import { isInt, isString } from "radash"

export enum RoleEnum {
  KILLER = 1,
  SURVIVOR = 2,
}

export const RoleList: RoleEnum[] = Object.keys(RoleEnum)
  .filter((key) => isInt(RoleEnum[key]))
  .map((key) => RoleEnum[key])
