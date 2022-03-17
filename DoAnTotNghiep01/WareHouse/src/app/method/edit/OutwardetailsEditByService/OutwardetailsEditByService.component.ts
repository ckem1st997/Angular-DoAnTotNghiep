import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { OutwardDetailDTO } from 'src/app/model/OutwardDetailDTO';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { OutwardDetailsValidator } from 'src/app/validator/OutwardDetailsValidator';

@Component({
  selector: 'app-OutwardetailsEditByService',
  templateUrl: './OutwardetailsEditByService.component.html',
  styleUrls: ['./OutwardetailsEditByService.component.scss']
})
export class OutwardetailsEditByServiceComponent implements OnInit {
  title = "Chỉnh sửa vật tư phiếu xuất kho";
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: OutwardDetailDTO;
  options!: FormGroup;
  serialWareHousesShow: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<OutwardetailsEditByServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OutwardDetailDTO,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    private service: WareHouseBookService
  ) { this.notifier = notifierService; }
  ngOnInit() {
    this.dt = this.data;
    this.serialWareHousesShow = this.data.serialWareHouses;
    this.form = this.formBuilder.group({
      id: this.dt.id,
      outwardId: this.dt.outwardId,
      itemId: this.dt.itemId,
      unitId: this.dt.unitId,
      uiquantity: this.dt.uiquantity,
      uiprice: this.dt.uiprice,
      amount: this.dt.amount,
      quantity: this.dt.quantity,
      price: this.dt.price,
      departmentId: this.dt.departmentId,
      departmentName: null,
      employeeId: this.dt.employeeId,
      employeeName: null,
      stationId: this.dt.stationId,
      stationName: null,
      projectId: this.dt.projectId,
      projectName: null,
      customerId: this.dt.customerId,
      customerName: null,
      accountMore: this.dt.accountMore,
      accountYes: this.dt.accountYes,
      status: this.dt.status,
      serialWareHouses: this.dt.serialWareHouses
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  changAmount() {
    var getUiQuantity = this.form.value['uiquantity'];
    var getUiPrice = this.form.value['uiprice'];
    this.form.patchValue({ amount: getUiPrice * getUiQuantity });
  }
  changItem(e: any) {
    var idSelect = e.target.value.split(" ")[1];
    this.service.GetUnitByIdItem(idSelect).subscribe(res => {
      this.dt.unitDTO = res.data;
      this.form.patchValue({ unitId: this.dt.wareHouseItemDTO?.find(x => x.id === idSelect)?.unitId ?? null });
    })

  }
  onSubmit() {
    var test = new OutwardDetailsValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true) {
      this.form.value["departmentName"] = this.dt.getDepartmentDTO.find(x => x.id === this.form.value["departmentId"])?.name;
      this.form.value["employeeName"] = this.dt.getEmployeeDTO.find(x => x.id === this.form.value["employeeId"])?.name;
      this.form.value["stationName"] = this.dt.getStationDTO.find(x => x.id === this.form.value["stationId"])?.name;
      this.form.value["customerName"] = this.dt.getCustomerDTO.find(x => x.id === this.form.value["customerId"])?.name;
      this.form.value["projectName"] = this.dt.getProjectDTO.find(x => x.id === this.form.value["projectId"])?.name;

      var serialWareHouses = this.form.value["serialWareHouses"];
      if (serialWareHouses !== undefined && serialWareHouses !== null)
        serialWareHouses.forEach((element: { id: string; itemId: string; serial: string; outwardDetailId: string; isOver: boolean } | null) => {
          if (element !== null && element.id !== undefined && element.id !== null) {
         //   element.id = Guid.newGuid();
            element.itemId = this.form.value["itemId"];
            element.outwardDetailId = this.form.value["id"];
            element.isOver = true;
          }
        });
      this.dialogRef.close(this.form.value);
     // this.notifier.notify('success', 'Chỉnh sửa thành công !');
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

