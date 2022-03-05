import { BaseModel } from "./BaseModel";
import { InwardDTO } from "./InwardDTO";
import { UnitDTO } from "./UnitDTO";
import { WareHouseItemDTO } from "./WareHouseItemDTO";

export interface InwardDetailDTO extends BaseModel {
    inwardId: string;
    itemId: string;
    unitId: string;
    uiquantity: number;
    uiprice: number;
    amount: number;
    quantity: number;
    price: number;
    departmentId: string;
    departmentName: string;
    employeeId: string;
    employeeName: string;
    stationId: string;
    stationName: string;
    projectId: string;
    projectName: string;
    customerId: string;
    customerName: string;
    accountMore: string;
    accountYes: string;
    status: string;
    inward: InwardDTO;
    item: WareHouseItemDTO;
    unit: UnitDTO;
    unitDTO: UnitDTO[];
    wareHouseItemDTO: WareHouseItemDTO[];
   // serialWareHouses: SerialWareHouse[];
}