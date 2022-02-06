import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  item: WareHouseItemUnitDTO = {
    itemId: '',
    unitId: '',
    unitName: '',
    convertRate: 0,
    isPrimary: null,
    item: null,
    unit: null,
    id: '',
    domainEvents: []
  };
  // table
  
  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'unitName', 'convertRate', 'note'];
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
    this.dt = this.data;
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
    this.dataSourceItemUnit.data = this.dt.wareHouseItemUnits;
    //  this.GetDataItemUnit();
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  // GetDataItemUnit() {
  //   this.service.getListItemUnit(this.dt.id).subscribe(list => {
  //     this.dataSourceItemUnit.data = list.data;
  //   });
  // this.listDelete = [];
  // this.selection.clear();
  //}
  //


  changUnit(e: any) {

    var idSelect = e.target.value.split(" ")[1];
    var check = this.dataSourceItemUnit.data.find(x => x.id == idSelect);
    if (check?.id === undefined) {
      var getUnitName = document.getElementById("unitSelect") as HTMLSelectElement;
      var nameUnit = getUnitName.options[getUnitName.selectedIndex].text;
      var item= {
        itemId: this.dt.id,
        unitId: idSelect,
        unitName: nameUnit,
        convertRate: 1,
        isPrimary: true,
        item: null,
        unit: null,
        id:  Guid.newGuid(),
        domainEvents: []
      };
      this.dt.wareHouseItemUnits.push(item);
      this.dataSourceItemUnit.data=this.dt.wareHouseItemUnits;
    }
  }


  getNote(name: string, convert: number): string {
    //
    var getUnitName = document.getElementById("unitSelect") as HTMLSelectElement;
    var nameUnit = getUnitName.options[getUnitName.selectedIndex].text;
    return convert + ' ' + name + ' = ' + '1 ' + nameUnit;
  }

  //
  onSubmit() {
    var test = new WareHouseItemValidator();
    var msg = test.validate(this.form.value);
    this.form.value.wareHouseItemUnits=this.dt.wareHouseItemUnits;
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

