import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { IBaseSearchDTO, IIdsTargetDTO, IIdTargetDTO } from "./interfaces";

export class IdTargetDTO implements IIdTargetDTO {
  @IsNumber()
  id: number;
}

export class IdsTargetDTO implements IIdsTargetDTO {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: Array<number>;
}

export class BaseSearchDTO implements IBaseSearchDTO{
  @IsOptional()
  @IsNumber()
  page_size: number;

  @IsOptional()
  @IsNumber()
  page_number: number;

  @IsOptional()
  @IsBoolean()
  with_deleted: boolean;

  @IsOptional()
  @IsString()
  sort_by: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  sort_order: "ASC" | "DESC";
}
