import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { BaseSelectDTO } from 'src/app/model/BaseSelectDTO';
import { OutwardDetailDTO } from 'src/app/model/OutwardDetailDTO';
import { OutwardDTO } from 'src/app/model/OutwardDTO';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { OutwardService } from 'src/app/service/Outward.service';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { InwardValidator } from 'src/app/validator/InwardValidator';
import { OutwardValidator } from 'src/app/validator/OutwardValidator';
import { InwarDetailsEditComponent } from '../../edit/InwarDetailsEdit/InwarDetailsEdit.component';
import { InwarDetailsCreateComponent } from '../InwarDetailsCreate/InwarDetailsCreate.component';
import { OutwarDetailsCreateComponent } from './../OutwarDetailsCreate/OutwarDetailsCreate.component';
import { OutwarDetailsEditComponent } from './../../edit/OutwarDetailsEdit/OutwarDetailsEdit.component';

@Component({
  selector: 'app-OutwardCreate',
  templateUrl: './OutwardCreate.component.html',
  styleUrls: ['./OutwardCreate.component.scss']
})
export class OutwardCreateComponent implements OnInit {
  form!: FormGroup;
  listDetails = Array<OutwardDetailDTO>();
  listItem = Array<WareHouseItemDTO>();
  listUnit = Array<UnitDTO>();
  getDepartmentDTO = Array<BaseSelectDTO>();
  getEmployeeDTO = Array<BaseSelectDTO>();
  getStationDTO = Array<BaseSelectDTO>();
  getProjectDTO = Array<BaseSelectDTO>();
  getCustomerDTO = Array<BaseSelectDTO>();
  getAccountDTO = Array<BaseSelectDTO>();
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
    toWareHouseId:null,
    getCreateBy: []
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
    const whid = this.route.snapshot.paramMap.get('whid');
    this.service.AddIndex(whid).subscribe(x => {
      this.dt = x.data;
    });
    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      voucherCode: null,
      voucher: this.dt.voucher,
      voucherDate: new Date().toISOString().slice(0, 16),
      wareHouseId: this.route.snapshot.paramMap.get('whid'),
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
      outwardDetails: null,
      toWareHouseId:null

    });
  }

  getCreate() {


  }
  getNameItem(id: string) {
    return this.listItem.find(x => x.id === id)?.name;
  }
  getNameUnit(id: string) {
    return this.listUnit.find(x => x.id === id)?.unitName;
  }
  addData() {
    this.serviceBook.AddOutwarDetailsIndex().subscribe(x => {
      const model = x.data;
      // lấy data từ api gán vào biến tạm
      this.listItem = x.data.wareHouseItemDTO;
      this.listUnit = x.data.unitDTO;
      this.getCustomerDTO = x.data.getCustomerDTO;
      this.getAccountDTO=x.data.getAccountDTO;
      this.getDepartmentDTO = x.data.getDepartmentDTO;
      this.getEmployeeDTO = x.data.getEmployeeDTO;
      this.getProjectDTO = x.data.getProjectDTO;
      this.getStationDTO = x.data.getStationDTO;
      model.outwardId = this.form.value["id"];
      const dialogRef = this.dialog.open(OutwarDetailsCreateComponent, {
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
  openDialogDelelte(id: string): void {
    const model = this.listDetails.find(x => x.id === id);
    if (model !== undefined) {
      this.listDetails = this.listDetails.filter(x => x !== this.listDetails.find(x => x.id === id));
      this.dataSource.data = this.listDetails;
      this.table.renderRows();
      this.notifier.notify('success', 'Xóa thành công');
    }
    else
      this.notifier.notify('error', 'Xóa thất bại');

  }


  openDialogedit(id: string): void {

    const model = this.listDetails.find(x => x.id === id);
    if (model !== undefined) {
      // gán data từ biến tạm gán vào biến model, để tránh gọi sang api lấy lại data
      if (model.wareHouseItemDTO.length < 1) this.listItem.forEach(element => { model.wareHouseItemDTO.push(element) });
      if (model.unitDTO.length < 1) this.listUnit.forEach(element => { model.unitDTO.push(element) });
      if (model.getCustomerDTO.length < 1) this.getCustomerDTO.forEach(element => { model.getCustomerDTO.push(element) });
      if (model.getDepartmentDTO.length < 1) this.getDepartmentDTO.forEach(element => { model.getDepartmentDTO.push(element) });
      if (model.getEmployeeDTO.length < 1) this.getEmployeeDTO.forEach(element => { model.getEmployeeDTO.push(element) });
      if (model.getProjectDTO.length < 1) this.getProjectDTO.forEach(element => { model.getProjectDTO.push(element) });
      if (model.getStationDTO.length < 1) this.getStationDTO.forEach(element => { model.getStationDTO.push(element) });
      if (model.getAccountDTO.length < 1) this.getAccountDTO.forEach(element => { model.getAccountDTO.push(element) });

      const dialogRef = this.dialog.open(OutwarDetailsEditComponent, {
        width: '550px',
        data: model,
      });

      dialogRef.afterClosed().subscribe(result => {
        var res = result;
        if (res) {
          this.listDetails[this.listDetails.findIndex(x => x.id === res.id)] = res;
          this.dataSource.data = this.listDetails;
          this.table.renderRows();
        }
      });
    }

  }


  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
  }

  onSubmit() {
    this.form.value["voucher"] = this.dt.voucher;
    var test = new OutwardValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true) {
      var checkDetails = this.listDetails.length > 0;
      if (checkDetails == true) {
        this.form.value["outwardDetails"] = this.listDetails;
        this.service.Add(this.form.value).subscribe(x => {
          if (x.success)
            this.notifier.notify('success', 'Thêm thành công');
          else
            this.notifier.notify('error', x.errors["msg"][0]);
        } ,     error => {
          if (error.error.errors.length === undefined)
            this.notifier.notify('error', error.error.message);
          else
            this.notifier.notify('error', error.error);
        }
        );
      }
      else {
        this.notifier.notify('error', 'Vui lòng nhập chi tiết phiếu xuất');
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
