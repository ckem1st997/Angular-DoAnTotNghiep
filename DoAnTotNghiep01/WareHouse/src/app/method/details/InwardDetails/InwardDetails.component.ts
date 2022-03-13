import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { BaseSelectDTO } from 'src/app/model/BaseSelectDTO';
import { InwardDetailDTO } from 'src/app/model/InwardDetailDTO';
import { InwardDTO } from 'src/app/model/InwardDTO';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { InwardService } from 'src/app/service/Inward.service';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { InwardValidator } from 'src/app/validator/InwardValidator';
import { InwarDetailsCreateComponent } from '../../create/InwarDetailsCreate/InwarDetailsCreate.component';
import { InwarDetailsEditByServiceComponent } from '../../edit/InwarDetailsEditByService/InwarDetailsEditByService.component';
import { InwardDetailDetailsComponent } from '../InwardDetailDetails/InwardDetailDetails.component';

@Component({
  selector: 'app-InwardDetails',
  templateUrl: './InwardDetails.component.html',
  styleUrls: ['./InwardDetails.component.scss']
})
export class InwardDetailsComponent implements OnInit {
  form!: FormGroup;
  listDetails = Array<InwardDetailDTO>();
  listItem = Array<WareHouseItemDTO>();
  listUnit = Array<UnitDTO>();
  getDepartmentDTO = Array<BaseSelectDTO>();
  getEmployeeDTO = Array<BaseSelectDTO>();
  getStationDTO = Array<BaseSelectDTO>();
  getProjectDTO = Array<BaseSelectDTO>();
  getCustomerDTO = Array<BaseSelectDTO>();
  dt: InwardDTO = {
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
    vendorDTO: [],
    domainEvents: [],
    voucher: null,
    getCreateBy: [],
    inwardDetails: []
  };
  private readonly notifier!: NotifierService;
  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'uiquantity', 'uiprice', 'amount', 'departmentName', 'employeeName', 'stationName', 'projectName', 'customerName', 'method'];
  dataSource = new MatTableDataSource<InwardDetailDTO>();
  @ViewChild(MatTable)
  table!: MatTable<InwardDetailDTO>;

  constructor(private serviceBook: WareHouseBookService, notifierService: NotifierService, public dialog: MatDialog, private formBuilder: FormBuilder, private route: ActivatedRoute, private service: InwardService) {
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
      inwardDetails: null
    });
  }

  getData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null)
      this.service.Details(id).subscribe(x => {
        this.dt = x.data;
        this.listDetails = this.dt.inwardDetails;
        this.dataSource.data = this.dt.inwardDetails;
        this.table.renderRows();
        this.form.patchValue({
          id: this.dt.id,
          voucherCode: this.dt.voucherCode,
          voucher: this.dt.voucher,
          voucherDate: this.dt.voucherDate,
          wareHouseId: this.dt.wareHouseId,
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
          inwardDetails: null
        });
      });

    this.serviceBook.AddInwarDetailsIndex().subscribe(x => {
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
  addData() {
    this.serviceBook.AddInwarDetailsIndex().subscribe(x => {
      const model = x.data;
      // lấy data từ api gán vào biến tạm
      this.listItem = x.data.wareHouseItemDTO;
      this.listUnit = x.data.unitDTO;
      this.getCustomerDTO = x.data.getCustomerDTO;
      this.getDepartmentDTO = x.data.getDepartmentDTO;
      this.getEmployeeDTO = x.data.getEmployeeDTO;
      this.getProjectDTO = x.data.getProjectDTO;
      this.getStationDTO = x.data.getStationDTO;
      model.inwardId = this.form.value["id"];
      const dialogRef = this.dialog.open(InwarDetailsCreateComponent, {
        width: '450px',
        data: model
      });

      dialogRef.afterClosed().subscribe(result => {
        var res = result;
        if (res) {
          this.listDetails.push(result);
          this.dataSource.data = this.listDetails;
          this.table.renderRows();
        }
      });

    });

  }


  openDialogDetails(model: InwardDetailDTO): void {
      const dialogRef = this.dialog.open(InwardDetailDetailsComponent, {
        width: '550px',
        data:model
      });
  }


  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
  }

  onSubmit() {
    this.form.value["voucher"] = this.dt.voucher;
    var test = new InwardValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true) {
      var checkDetails = this.listDetails.length > 0;
      if (checkDetails == true) {
        this.form.value["inwardDetails"] = this.listDetails;
        this.service.Edit(this.form.value).subscribe(x => {
          if (x.success)
            this.notifier.notify('success', 'Chỉnh sửa thành công');
          else {
            if (x.errors["msg"] !== undefined && x.errors["msg"].length !== undefined)
              this.notifier.notify('error', x.errors["msg"][0]);
            else
              this.notifier.notify('error', x.message);
          }
        },
        error => {
            if (error.error.errors.length === undefined)
              this.notifier.notify('error', error.error.message);
            else
              this.notifier.notify('error', error.error);
          }
        );
      }
      else {
        this.notifier.notify('error', 'Vui lòng nhập chi tiết phiếu nhập');
      }


    }

    else {
      var message = '';
      for (const [key, value] of Object.entries(msg)) {
        message = message + " " + value;
      }
      this.notifier.notify('error', message);
    }

  }
}
