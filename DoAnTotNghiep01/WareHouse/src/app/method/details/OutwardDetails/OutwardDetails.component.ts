import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BaseSelectDTO } from 'src/app/model/BaseSelectDTO';
import { OutwardDetailDTO } from 'src/app/model/OutwardDetailDTO';
import { OutwardDTO } from 'src/app/model/OutwardDTO';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { OutwardService } from 'src/app/service/Outward.service';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { OutwardValidator } from 'src/app/validator/OutwardValidator';
import { environment } from 'src/environments/environment';
import { OutwardDetailDetailsComponent } from '../OutwardDetailDetails/OutwardDetailDetails.component';

@Component({
  selector: 'app-OutwardDetails',
  templateUrl: './OutwardDetails.component.html',
  styleUrls: ['./OutwardDetails.component.scss']
})
export class OutwardDetailsComponent implements OnInit {
  baseAPI: string = environment.baseApi;

  form!: FormGroup;
  listDetails = Array<OutwardDetailDTO>();
  listItem = Array<WareHouseItemDTO>();
  listUnit = Array<UnitDTO>();
  getDepartmentDTO = Array<BaseSelectDTO>();
  getEmployeeDTO = Array<BaseSelectDTO>();
  getStationDTO = Array<BaseSelectDTO>();
  getProjectDTO = Array<BaseSelectDTO>();
  getCustomerDTO = Array<BaseSelectDTO>();
  dt: OutwardDTO = {
    id: "",
    voucherCode: null,
    voucherDate: null,
    wareHouseId: null,
    deliver: null,
    receiver: null,
    vendorId: null,
    reason: null,
    reasonDescription: null,
    description: null,
    reference: null,
    createdDate: null,
    createdBy: null,
    modifiedDate: null,
    modifiedBy: null,
    deliverPhone: null,
    deliverAddress: null,
    deliverDepartment: null,
    receiverPhone: null,
    receiverAddress: null,
    receiverDepartment: null,
    wareHouseDTO: [],
    domainEvents: [],
    voucher: null,
    getCreateBy: [],
    outwardDetails: [],
    toWareHouseId: null
  };
  private readonly notifier!: NotifierService;
  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'uiquantity', 'uiprice', 'amount', 'departmentName', 'employeeName', 'stationName', 'projectName', 'customerName', 'method'];
  dataSource = new MatTableDataSource<OutwardDetailDTO>();
  @ViewChild(MatTable)
  table!: MatTable<OutwardDetailDTO>;

  constructor(private serviceBook: WareHouseBookService, notifierService: NotifierService, public dialog: MatDialog, private formBuilder: FormBuilder, private route: ActivatedRoute, private service: OutwardService) {
    this.notifier = notifierService;
  }
  @HostListener('window:resize', ['$event'])

  onWindowResize(): void {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    var clientHeightForm = document.getElementById('formCreateDiv') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 75 - clientHeight.clientHeight + "px";
    clientHeightForm.style.paddingTop = clientHeight.clientHeight + "px";
  }
  ngOnInit() {
    this.onWindowResize();
    this.getData();
    this.form = this.formBuilder.group({
      id:null,
      voucherCode: null,
      voucher: this.dt.voucher,
      voucherDate: new Date().toISOString().slice(0, 16),
      wareHouseId: null,
      deliver: null,
      receiver: null,
      vendorId: null,
      reason: null,
      reasonDescription: null,
      description: null,
      reference: null,
      createdDate: new Date().toISOString().slice(0, 16),
      createdBy: null,
      modifiedDate: new Date().toISOString().slice(0, 16),
      modifiedBy: null,
      deliverPhone: null,
      deliverAddress: null,
      deliverDepartment: null,
      receiverPhone: null,
      receiverAddress: null,
      receiverDepartment: null,
      OutwardDetails: null,
      toWareHouseId: null

    });
  }

  getData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null)
      this.service.Details(id).subscribe(x => {
        this.dt = x.data;
        this.listDetails = this.dt.outwardDetails;
        this.dataSource.data = this.dt.outwardDetails;
        this.table.renderRows();
        this.form.patchValue({
          id: this.dt.id,
          voucherCode: this.dt.voucherCode,
          voucher: this.dt.voucher,
          voucherDate: this.dt.voucherDate,
          wareHouseId: this.dt.wareHouseId,
          toWareHouseId: this.dt.toWareHouseId,
          deliver: this.dt.deliver,
          receiver: this.dt.receiver,
          vendorId: this.dt.vendorId,
          reason: this.dt.reason,
          reasonDescription: this.dt.reasonDescription,
          description: this.dt.description,
          reference: null,
          createdDate: this.dt.createdDate,
          createdBy: this.dt.createdBy,
          modifiedDate: this.dt.modifiedDate,
          modifiedBy: this.dt.modifiedBy,
          deliverPhone: this.dt.deliverPhone,
          deliverAddress: this.dt.deliverAddress,
          deliverDepartment: this.dt.deliverDepartment,
          receiverPhone: this.dt.receiverPhone,
          receiverAddress: this.dt.receiverAddress,
          receiverDepartment: this.dt.receiverDepartment,
          OutwardDetails: null
        });
      },     error => {
        if (error.error.errors.length === undefined)
          this.notifier.notify('error', error.error.message);
        else
          this.notifier.notify('error', error.error);
      });

    this.serviceBook.AddOutwarDetailsIndex().subscribe(x => {
      this.listItem = x.data.wareHouseItemDTO;
      this.listUnit = x.data.unitDTO;
    });

  }
  getNameItem(id: string) {
    return this.listItem.find(x => x.id === id)?.name;
  }
  getNameUnit(id: string) {
    return this.listUnit.find(x => x.id === id)?.unitName;
  }


  openDialogDetails(model: OutwardDetailDTO): void {
      const dialogRef = this.dialog.open(OutwardDetailDetailsComponent, {
        width: '550px',
        data:model
      });
  }

}
