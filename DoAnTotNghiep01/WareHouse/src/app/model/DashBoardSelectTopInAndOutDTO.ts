import { BaseModel } from "./BaseModel";


export interface DashBoardSelectTopInAndOutDTO extends BaseModel {
    count: number;
    name: string;
    code: string;
    unitName: string;
    sumQuantity: number;
    sumPrice: number;
}