import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { BeginningWareHouseDTO } from 'src/app/model/BeginningWareHouseDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { WareHouseItemUnitDTO } from 'src/app/model/WareHouseItemUnitDTO';
import { BeginningWareHouseService } from 'src/app/service/BeginningWareHouse.service';
import { BeginningWareHouseValidator } from 'src/app/validator/BeginningWareHouseValidator';
import { WareHouseItemValidator } from 'src/app/validator/WareHouseItemValidator';
import { WareHouseItemUnitCreateComponent } from '../../create/WareHouseItemUnitCreate/WareHouseItemUnitCreate.component';
import { WareHouseItemUnitDelelteComponent } from '../../delete/WareHouseItemUnitDelelte/WareHouseItemUnitDelelte.component';
import { WareHouseItemEditComponent } from '../WareHouseItemEdit/WareHouseItemEdit.component';

@Component({
  selector: 'app-WareHouseBenginingEdit',
  templateUrl: './WareHouseBenginingEdit.component.html',
  styleUrls: ['./WareHouseBenginingEdit.component.scss']
})
export class WareHouseBenginingEditComponent implements OnInit {

  title = "Chỉnh sửa tồn kho đầu kì";
  isDataLoaded: boolean = true;
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: BeginningWareHouseDTO;
  options!: FormGroup;
  item: BeginningWareHouseDTO = {
    wareHouseId: '',
    itemId: '',
    unitId: '',
    unitName: '',
    quantity: 0,
    createdDate: '',
    createdBy: '',
    modifiedDate: '',
    modifiedBy: '',
    item: null,
    unit: null,
    wareHouse: null,
    id: '',
    domainEvents: [],
    wareHouseItemDTO: null,
    unitDTO: null,
    wareHouseDTO: null
  };
  // table

  constructor(
    public dialogRef: MatDialogRef<WareHouseBenginingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BeginningWareHouseDTO,
    private formBuilder: FormBuilder,
    private service: BeginningWareHouseService,
    notifierService: NotifierService,
    public dialog: MatDialog,
  ) {
    this.notifier = notifierService;
  }
  ngOnInit(): void {
    this.dt = this.data;
    this.form = this.formBuilder.group({
      id: this.dt.id,
      wareHouseId: this.dt.wareHouseId,
      itemId: this.dt.itemId,
      unitId: this.dt.unitId,
      quantity: this.dt.quantity,
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }


  //
  onSubmit() {
    var test = new BeginningWareHouseValidator();
    var msg = test.validate(this.form.value);
    var check = JSON.stringify(msg) == '{}';
    if (check == true)
      this.service.Edit(this.form.value).subscribe(x => {
        if (x.success)
          this.dialogRef.close(x.success)
        else {
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

