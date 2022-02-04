import { BaseModel } from "./BaseModel";

export interface WareHouseItemDTO extends BaseModel {
    code: string;
    name: string;
    categoryId: string;
    description: string;
    vendorId: string;
    vendorName: string;
    country: string;
    unitId: string;
    inactive: boolean | null;
}