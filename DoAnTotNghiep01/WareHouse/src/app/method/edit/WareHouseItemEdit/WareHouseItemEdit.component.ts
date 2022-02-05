import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { WareHouseItemUnitDTO } from 'src/app/model/WareHouseItemUnitDTO';
import { WareHouseItemService } from 'src/app/service/WareHouseItem.service';
import { WareHouseItemValidator } from 'src/app/validator/WareHouseItemValidator';
import { WareHouseItemCreateComponent } from '../../create/WareHouseItemCreate/WareHouseItemCreate.component';



@Component({
  selector: 'app-WareHouseItemEdit',
  templateUrl: './WareHouseItemEdit.component.html',
  styleUrls: ['./WareHouseItemEdit.component.css']
})
export class WareHouseItemEditComponent implements OnInit {
  title = "Chỉnh sửa vật tư";
  isDataLoaded: boolean = true;
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: WareHouseItemDTO;
  options!: FormGroup;

  // table

  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'unitName','convertRate','note'];
  dataSourceItemUnit = new MatTableDataSource<WareHouseItemUnitDTO>();
  constructor(
    public dialogRef: MatDialogRef<WareHouseItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WareHouseItemDTO,
    private formBuilder: FormBuilder,
    private service: WareHouseItemService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  ngOnInit(): void {
    this.dt=this.data;
    this.form = this.formBuilder.group({
      id: this.dt.id,
      code: this.dt.code,
      name: this.dt.name,
      categoryId: this.dt.categoryId,
      vendorId: this.dt.vendorId,
      country: this.dt.country,
      unitId: this.dt.unitId,
      description: this.dt.description,
      inactive: this.dt.inactive,
    });
    this.GetDataItemUnit();
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  GetDataItemUnit() {
    this.service.getListItemUnit(this.dt.id).subscribe(list => {
      this.dataSourceItemUnit.data = list.data;
    });
    // this.listDelete = [];
    // this.selection.clear();
  }
  onSubmit() {
    var test = new WareHouseItemValidator();
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

