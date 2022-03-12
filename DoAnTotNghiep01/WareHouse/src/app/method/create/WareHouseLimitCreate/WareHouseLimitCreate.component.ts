import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { WareHouseLimitDTO } from 'src/app/model/WareHouseLimitDTO';
import { WareHouseLimitService } from 'src/app/service/WareHouseLimit.service';
import { WareHouseLimitValidator } from 'src/app/validator/WareHouseLimitValidator';
import { WareHouseBenginingCreateComponent } from '../WareHouseBenginingCreate/WareHouseBenginingCreate.component';
import { WareHouseDTO } from './../../../model/WareHouseDTO';

@Component({
  selector: 'app-WareHouseLimitCreate',
  templateUrl: './WareHouseLimitCreate.component.html',
  styleUrls: ['./WareHouseLimitCreate.component.scss']
})
export class WareHouseLimitCreateComponent implements OnInit {
  title = "Thêm mới tồn kho đầu kì";
  isDataLoaded: boolean = true;
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: WareHouseLimitDTO;
  options!: FormGroup;
  item: WareHouseLimitDTO = {
    wareHouseId: null,
    itemId: null,
    unitId: null,
    unitName: null,
    minQuantity: 0,
    maxQuantity: 0,
    createdDate: '',
    createdBy: '',
    modifiedDate: '',
    modifiedBy: '',
    item: null,
    unit: null,
    wareHouse: null,
    wareHouseItemDTO: null,
    unitDTO: null,
    wareHouseDTO: null,
    id: '',
    domainEvents: []
  };
  // table

  constructor(
    public dialogRef: MatDialogRef<WareHouseLimitCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WareHouseLimitDTO,
    private formBuilder: FormBuilder,
    private service: WareHouseLimitService,
    notifierService: NotifierService,
    public dialog: MatDialog,
  ) {
    this.notifier = notifierService;
  }
  ngOnInit(): void {
    this.dt = this.data;
    this.form = this.formBuilder.group({
      id: this.dt.id ?? Guid.newGuid(),
      wareHouseId: this.dt.wareHouseId,
      itemId: this.dt.itemId,
      unitId: this.dt.unitId,
      minQuantity: this.dt.minQuantity,
      maxQuantity: this.dt.maxQuantity,
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  changItem(e: any) {
    var idSelect = e.target.value.split(" ")[1];
    this.dt.unitId = this.dt.wareHouseItemDTO?.find(x => x.id === idSelect)?.unitId ?? null;
    this.form.patchValue({ unitId: this.dt.unitId });
  }

  //
  onSubmit() {
    var test = new WareHouseLimitValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true)
      this.service.Add(this.form.value).subscribe(x => {
        if (x.success)
          this.dialogRef.close(x.success)
        else {
          if (x.errors["msg"] != undefined)
            this.notifier.notify('error', x.errors["msg"][0]);
          else
            this.notifier.notify('error', x.message);
        }
      } ,     error => {
        if (error.error.errors.length === undefined)
          this.notifier.notify('error', error.error.message);
        else
          this.notifier.notify('error', error.error);
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

