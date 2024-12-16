import { PartialType } from "@nestjs/mapped-types";
import { CreateTeaDto } from "../create-tea.dto/create-tea.dto";

export class UpdateTeaDto extends PartialType(CreateTeaDto) {}
