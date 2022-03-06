import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { InwardDetailDTO } from 'src/app/model/InwardDetailDTO';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { InwardDetailsValidator } from 'src/app/validator/InwardDetailsValidator';
import { VendorValidator } from 'src/app/validator/VendorValidator';

@Component({
  selector: 'app-InwarDetailsCreate',
  templateUrl: './InwarDetailsCreate.component.html',
  styleUrls: ['./InwarDetailsCreate.component.scss']
})
export class InwarDetailsCreateComponent implements OnInit {
  title = "Thêm mới vật tư";
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: InwardDetailDTO;
  options!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<InwarDetailsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InwardDetailDTO,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    private service: WareHouseBookService
  ) { this.notifier = notifierService; }
  ngOnInit() {
    this.dt = this.data;

    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      inwardId: this.dt.inwardId,
      itemId: null,
      unitId: null,
      uiquantity: 0,
      uiprice: 0,
      amount: 0,
      quantity: 0,
      price: 0,
      departmentId: null,
      departmentName: null,
      employeeId: null,
      employeeName: null,
      stationId: null,
      stationName: null,
      projectId: null,
      projectName: null,
      customerId: null,
      customerName: null,
      accountMore: null,
      accountYes: null,
      status: null
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  changAmount(){
    var getUiQuantity=this.form.value['uiquantity'];
    var getUiPrice=this.form.value['uiprice'];
    this.form.patchValue({ amount: getUiPrice*getUiQuantity });
  }
  changItem(e: any) {
    var idSelect = e.target.value.split(" ")[1];
    this.service.GetUnitByIdItem(idSelect).subscribe(res => {
      this.dt.unitDTO = res.data;
      this.form.patchValue({ unitId: this.dt.wareHouseItemDTO?.find(x => x.id === idSelect)?.unitId ?? null });
    })

  }
  onSubmit() {
    var test = new InwardDetailsValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true)
    {
      this.dialogRef.close(this.form.value);
      this.notifier.notify('success', 'Thêm thành công !');
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

