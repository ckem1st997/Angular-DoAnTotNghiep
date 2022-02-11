import { BaseSearchModel } from "./BaseSearchModel";

export interface WareHouseBookSearchModel extends BaseSearchModel {
    typeWareHouseBook: string | null;
    fromDate: Date | null;
    toDate: Date | null;
    wareHouseId:string|null;
}