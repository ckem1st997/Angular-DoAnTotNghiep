import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Unit } from 'src/app/entity/Unit';
import { UnitValidator } from 'src/app/validator/UnitValidator';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { TreeView } from 'src/app/model/TreeView';
import { WarehouseService } from 'src/app/service/warehouse.service';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-WareHouseBengining',
  templateUrl: './WareHouseBengining.component.html',
  styleUrls: ['./WareHouseBengining.component.scss']
})
export class WareHouseBenginingComponent implements OnInit {
  model!: Unit;
  message: object | undefined;
  formUnitTest = new FormGroup({
    unitName: new FormControl(this.model?.unitName)
  });

  //tree-view
  private _transformer = (node: TreeView, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSourceTreee = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service:WarehouseService) { }

  ngOnInit() {
    this.service.getTreeView().subscribe(x => this.dataSourceTreee.data = x.data);
  }

  lll(l: string) {
    console.log(l);
    // var val = document.getElementById("searchInput") as HTMLInputElement;
    // this.model.keySearch =l;
    // this.model.active=this.checkedl;
    // this.GetData();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn("value to form");
    console.warn(this.formUnitTest.value);
    var test = new UnitValidator();
    console.warn(test.validate(this.formUnitTest.value));
  }
}
