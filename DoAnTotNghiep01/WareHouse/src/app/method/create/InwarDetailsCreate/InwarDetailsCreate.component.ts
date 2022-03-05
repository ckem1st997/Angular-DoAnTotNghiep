import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { InwardDetailDTO } from 'src/app/model/InwardDetailDTO';
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
    notifierService: NotifierService
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
  onSubmit() {
    var test = new VendorValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true)
      this.dialogRef.close(1)
    else {
      var message = '';
      for (const [key, value] of Object.entries(msg)) {
        message = message + " " + value;
      }
      this.notifier.notify('error', message);
    }

  }
}

