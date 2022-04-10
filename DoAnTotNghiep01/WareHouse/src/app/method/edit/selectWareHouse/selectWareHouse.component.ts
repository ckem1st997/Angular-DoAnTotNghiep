import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';
import { ExampleFlatNode } from 'src/app/model/ExampleFlatNode';
import { SelectListItem } from 'src/app/model/SelectListItem';
import { UserMaster } from 'src/app/model/UserMaster';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { RoleEditComponent } from '../RoleEdit/RoleEdit.component';




@Component({
  selector: 'app-selectWareHouse',
  templateUrl: './selectWareHouse.component.html',
  styleUrls: ['./selectWareHouse.component.scss'],
})
export class SelectWareHouseComponent implements OnInit {
  title = 'Danh sách kho !';
  private readonly notifier!: NotifierService;
  masterSelected!: boolean;
  checklist: SelectListItem[] = [];
  checkedList: any;
  constructor(public dialogRef: MatDialogRef<RoleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public datauser: UserMaster, notifierService: NotifierService, private servicewh: WarehouseService) {
    this.notifier = notifierService;
    this.masterSelected = false;
    this.servicewh.getListDropDown().subscribe(x => {
      x.data.forEach(element => {
        var tem = {
          disabled: false,
          selected: false,
          text: element.name,
          value: element.id
        };
        this.checklist.push(tem);
        
      });

    });
    this.getCheckedItemList();
  }

  ngAfterViewInit() {

  }
  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].selected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].selected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  getall() {
    // console.log(this.checklistSelection.selected);
    // var list = this.checklistSelection.selected;
    // var res = "";
    // for (var i = 0; i < list.length; i++) {
    //   var item = list[i];
    //   if (i < list.length - 1) {
    //     res = res + item.key + ",";
    //   }
    //   else {
    //     res = res + item.key;
    //   }
    // }
    // if(list!==undefined && list.length>0)
    // this.dialogRef.close(res)
    // else
    // {
    //   this.notifier.notify('warn', "Bạn chưa chọn kho nào !");
    //   this.dialogRef.close([]);
    // }

  }

}
