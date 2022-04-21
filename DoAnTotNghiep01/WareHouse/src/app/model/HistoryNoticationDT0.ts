import { BaseEntity } from "../entity/BaseEntity";

export interface HistoryNoticationDT0 extends BaseEntity {
    userName: string;
    method: string;
    body: string;
    createDate: string;
    read: boolean;
    link: string;
}