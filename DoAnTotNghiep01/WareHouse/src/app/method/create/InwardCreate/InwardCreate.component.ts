import { HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'src/app/extension/Guid';
import { InwardDTO } from 'src/app/model/InwardDTO';
import { InwardService } from 'src/app/service/Inward.service';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { InwarDetailsCreateComponent } from '../InwarDetailsCreate/InwarDetailsCreate.component';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { InwardDetailDTO } from 'src/app/model/InwardDetailDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { BaseSelectDTO } from 'src/app/model/BaseSelectDTO';
import { InwarDetailsEditComponent } from '../../edit/InwarDetailsEdit/InwarDetailsEdit.component';
@Component({
  selector: 'app-InwardCreate',
  templateUrl: './InwardCreate.component.html',
  styleUrls: ['./InwardCreate.component.scss']
})
export class InwardCreateComponent implements OnInit {
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
    getCreateBy: []
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

  onWindowResize() {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 64 - 55 - clientHeight.clientHeight + "px";
  }
  ngOnInit() {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 64 - 55 - clientHeight.clientHeight + "px";
    const whid = this.route.snapshot.paramMap.get('whid');
    this.service.AddIndex(whid).subscribe(x => {
      this.dt = x.data;
    });
    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      voucherCode: null,
      voucher: null,
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
      modifiedDate: null,
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

  getCreate() {
   

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
      const dialogRef = this.dialog.open(InwarDetailsEditComponent, {
        width: '550px',
        data: model,
      });

      dialogRef.afterClosed().subscribe(result => {
        var res = result;
        if (res) {
          this.listDetails = this.listDetails.filter(x => x !== this.listDetails.find(x => x.id === res.id));
          this.listDetails.push(res);
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
    console.log(this.form.value)
    // var test = new UnitValidator();
    // var msg = test.validate(this.form.value);
    // var check = JSON.stringify(msg) == '{}';
    // if (check == true)
    //   this.service.Add(this.form.value).subscribe(x => {
    //     if (x.success)
    //       this.dialogRef.close(x.success)
    //     else
    //       this.notifier.notify('error', x.errors["msg"][0]);
    //   }
    //   );
    // else {
    //   var message = '';
    //   for (const [key, value] of Object.entries(msg)) {
    //     message = message + " " + value;
    //   }
    //   this.notifier.notify('error', message);
    // }

  }
}
