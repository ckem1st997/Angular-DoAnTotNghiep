import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { ResultMessageResponse } from 'src/app/model/ResultMessageResponse';
import { VendorDTO } from 'src/app/model/VendorDTO';
import { WareHouseDTO } from 'src/app/model/WareHouseDTO';
import { VendorService } from 'src/app/service/VendorService.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { VendorValidator } from 'src/app/validator/VendorValidator';
import { WareHouseValidator } from 'src/app/validator/WareHouseValidator';

@Component({
  selector: 'app-WareHouseCreate',
  templateUrl: './WareHouseCreate.component.html',
  styleUrls: ['./WareHouseCreate.component.scss']
})
export class WareHouseCreateComponent implements OnInit {
  title = "Thêm kho vận";
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: WareHouseDTO;
  options!: FormGroup;
  listDropDown: ResultMessageResponse<WareHouseDTO> = {
    success: false,
    code: '',
    httpStatusCode: 0,
    title: '',
    message: '',
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: '',
    errors: {}
  }
  constructor(
    public dialogRef: MatDialogRef<WareHouseCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WareHouseDTO,
    private formBuilder: FormBuilder,
    private service: WarehouseService,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }
  ngOnInit() {
    this.dt = this.data;
    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      code: '',
      name: '',
      address: null,
      description: null,
      parentId: null,
      path: null,
      inactive: true,
    });
    this.getDropDown();
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  getDropDown() {
    this.service.getListDropDown().subscribe(x => this.listDropDown = x);
  }

  onSubmit() {
    var test = new WareHouseValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true)
      this.service.Add(this.form.value).subscribe(x => {
        if (x.success)
          this.dialogRef.close(x.success)
        else
          {
            if (x.errors["msg"] != undefined)
              this.notifier.notify('error', x.errors["msg"][0]);
            else
              this.notifier.notify('error', x.message);
          }
      }
      );
    else {
      var message = '';
      for (const [key, value] of Object.entries(msg)) {
        message = message + " " + value;
      }
      this.notifier.notify('error', message);
    }

  }
}

