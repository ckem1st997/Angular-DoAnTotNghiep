import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, HostListener, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';
import { UnitCreateComponent } from 'src/app/method/create/UnitCreate/UnitCreate.component';
import { UnitDeleteComponent } from 'src/app/method/delete/UnitDelete/UnitDelete.component';
import { UnitDetailsComponent } from 'src/app/method/details/UnitDetails/UnitDetails.component';
import { UnitEditComponent } from 'src/app/method/edit/UnitEdit/UnitEdit.component';
import { FormSearchWareHouseComponent } from 'src/app/method/search/FormSearchWareHouse/FormSearchWareHouse.component';
import { ExampleFlatNode } from 'src/app/model/ExampleFlatNode';
import { ResultMessageResponse } from 'src/app/model/ResultMessageResponse';
import { RoleSearchModel } from 'src/app/model/RoleSearchModel';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { UserMaster } from 'src/app/model/UserMaster';
import { WareHouseSearchModel } from 'src/app/model/WareHouseSearchModel';
import { AuthozireService } from 'src/app/service/Authozire.service';
import { UnitService } from 'src/app/service/Unit.service';
import { WarehouseService } from 'src/app/service/warehouse.service';

/**
 * Node for to-do item
 */
// export class TodoItemNode {
//   children!: TodoItemNode[]
//   name!: string;
//   key!: string;
// }

// /** Flat to-do item node with expandable and level information */
// export class TodoItemFlatNode {
//   name!: string;
//   level!: number;
//   expandable!: boolean;
//   key!: string;
// }

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null,
    },
  },
  Reminders: ['Cook dinner', 'Read the Material Design spec', 'Upgrade Application to Angular'],
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
// @Injectable()
// export class ChecklistDatabase {
//   dataChange = new BehaviorSubject<TodoItemNode[]>([]);

//   get data(): TodoItemNode[] {
//     return this.dataChange.value;
//   }

//   constructor(private serviceW: WarehouseService) {
//       this.initialize();
//   }

//   initialize() {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     this.serviceW.getTreeView().subscribe(x => {
//       const data = this.buildFileTree(x.data, 0);
//       this.dataChange.next(data);
//     });
//   //  const data = this.buildFileTree(TREE_DATA, 0);

//     // Notify the change.
//   //  this.dataChange.next(data);
//   }

//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `TodoItemNode`.
//    */
//   buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
//     return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new TodoItemNode();
//       node.name = value?.name;
//       node.key = value?.key;
//       if (node)
//         if (value != null) {
//           if (typeof value === 'object') {
//             node.children = this.buildFileTree(value.children, level + 1);
//           } 
//           else if(value.name != undefined) {
//             node.name = value.name;
//             node.key=value.key;
//           }
//         }

//       return accumulator.concat(node);
//     }, []);
//   }
// }

/**
 * @title Tree with checkboxes
 */

@Component({
  selector: 'app-RoleUser',
  templateUrl: './RoleUser.component.html',
  styleUrls: ['./RoleUser.component.scss'],
 // providers: [ChecklistDatabase]
})
export class RoleUserComponent implements OnInit {
  // /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  // /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  // /** A selected parent node to be inserted */
  // selectedParent: TodoItemFlatNode | null = null;

  // /** The new item's name */
  // newItemName = '';

  // treeControl: FlatTreeControl<TodoItemFlatNode>;

  // treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  // dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  // /** The selection for checklist */
  // checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  ///
  //
  listDelete: UserMaster[] = [];
  //select
  selection = new SelectionModel<UserMaster>(true, []);
  //noti
  private readonly notifier!: NotifierService;
  //tree-view

  checkSizeWindows: boolean = true;
  public getScreenWidth: any;
  public getScreenHeight: any;
  //
  panelOpenState = false;
  checkedl = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 50, 100];
  displayedColumns: string[] = ['select', 'id', 'userName','role','read','create', 'edit', 'delete', 'inActive', 'method'];
  dataSourceRole = new MatTableDataSource<UserMaster>();
  model: RoleSearchModel = {
    key:'',
    whId: '',
    num: 15,
    pages: 0
  };
  list: ResultMessageResponse<UserMaster> = {
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
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private service: AuthozireService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, notifierService: NotifierService, private serviceW: WarehouseService) {
    // this.treeFlattener = new MatTreeFlattener(
    //   this.transformer,
    //   this.getLevel,
    //   this.isExpandable,
    //   this.getChildren,
    // );
    // this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    // this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // _database.dataChange.subscribe(data => {
    //   this.dataSource.data = data;
    // });
    this.notifier = notifierService;

  }
  ngOnInit() {
    this.GetData();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.selection.clear();
  }
  // getLevel = (node: TodoItemFlatNode) => node.level;

  // isExpandable = (node: TodoItemFlatNode) => node.expandable;

  // getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  // hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  // hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name === '';

  // /**
  //  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  //  */
  // transformer = (node: TodoItemNode, level: number) => {
  //   const existingNode = this.nestedNodeMap.get(node);
  //   const flatNode =
  //     existingNode && existingNode.name === node.name ? existingNode : new TodoItemFlatNode();
  //   flatNode.name = node.name;
  //   flatNode.level = level;
  //   flatNode.key = node.key;
  //   flatNode.expandable = !!node.children?.length;
  //   this.flatNodeMap.set(flatNode, node);
  //   this.nestedNodeMap.set(node, flatNode);
  //   return flatNode;
  // };

  // /** Whether all the descendants of the node are selected. */
  // descendantsAllSelected(node: TodoItemFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected =
  //     descendants.length > 0 &&
  //     descendants.every(child => {
  //       return this.checklistSelection.isSelected(child);
  //     });
  //   return descAllSelected;
  // }

  // /** Whether part of the descendants are selected */
  // descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const result = descendants.some(child => this.checklistSelection.isSelected(child));
  //   return result && !this.descendantsAllSelected(node);
  // }

  // /** Toggle the to-do item selection. Select/deselect all the descendants node */
  // todoItemSelectionToggle(node: TodoItemFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   this.checklistSelection.isSelected(node)
  //     ? this.checklistSelection.select(...descendants)
  //     : this.checklistSelection.deselect(...descendants);

  //   // Force update for the parent
  //   descendants.forEach(child => this.checklistSelection.isSelected(child));
  //   this.checkAllParentsSelection(node);
  // }

  // /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  // todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   this.checkAllParentsSelection(node);
  // }

  // /* Checks all the parents when a leaf node is selected/unselected */
  // checkAllParentsSelection(node: TodoItemFlatNode): void {
  //   let parent: TodoItemFlatNode | null = this.getParentNode(node);
  //   while (parent) {
  //     this.checkRootNodeSelection(parent);
  //     parent = this.getParentNode(parent);
  //   }
  // }

  // /** Check root node checked state and change it accordingly */
  // checkRootNodeSelection(node: TodoItemFlatNode): void {
  //   const nodeSelected = this.checklistSelection.isSelected(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected =
  //     descendants.length > 0 &&
  //     descendants.every(child => {
  //       return this.checklistSelection.isSelected(child);
  //     });
  //   if (nodeSelected && !descAllSelected) {
  //     this.checklistSelection.deselect(node);
  //   } else if (!nodeSelected && descAllSelected) {
  //     this.checklistSelection.select(node);
  //   }
  // }

  // /* Get the parent node of a node */
  // getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
  //   const currentLevel = this.getLevel(node);

  //   if (currentLevel < 1) {
  //     return null;
  //   }

  //   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  //   for (let i = startIndex; i >= 0; i--) {
  //     const currentNode = this.treeControl.dataNodes[i];

  //     if (this.getLevel(currentNode) < currentLevel) {
  //       return currentNode;
  //     }
  //   }
  //   return null;
  // }
  // getall() {
  //   console.log(this.checklistSelection.selected);
  // }

  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngAfterViewInit() {
    this.dataSourceRole.paginator = this.paginator;
    this.dataSourceRole.sort = this.sort;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth <= 800)
      this.checkSizeWindows = false;
    else
      this.checkSizeWindows = true;
  }
  GetData() {
    this.service.getList(this.model.key,this.model.whId,this.model.pages,this.model.num).subscribe(list => {
      this.dataSourceRole.data = list.data; setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = list.totalCount;
      });
    });
    this.listDelete = [];
    this.selection.clear();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.model.pages = event.pageIndex 
    this.model.num = event.pageSize;
    this.GetData();
  }
  searchQuery() {
    var val = document.getElementById("searchInput") as HTMLInputElement;
    this.model.key = val.value;
 //   this.model.active = this.checkedl;
    this.GetData();
  }
  openDialog(model: UnitDTO): void {
    var val = document.getElementById("searchInput") as HTMLInputElement;

    const dialogRef = this.dialog.open(UnitEditComponent, {
      width: '550px',
      data: model,
    });

    dialogRef.afterClosed().subscribe(result => {
      var res = result;
      if (res) {
        this.notifier.notify('success', 'Chỉnh sửa thành công !');
        this.GetData();
      }
    });
  }
  openDialogDetals(model: UnitDTO): void {
    var val = document.getElementById("searchInput") as HTMLInputElement;

    const dialogRef = this.dialog.open(UnitDetailsComponent, {
      width: '550px',
      data: model,
    });
  }
  openDialogCreate(): void {
    var val = document.getElementById("searchInput") as HTMLInputElement;

    const dialogRef = this.dialog.open(UnitCreateComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      var res = result;
      if (res) {
        this.notifier.notify('success', 'Thêm mới thành công !');
        this.GetData();
      }
    });
  }

  openDialogDelelte(model: UnitDTO): void {
   // this.listDelete.push(model);
    const dialogRef = this.dialog.open(UnitDeleteComponent, {
      width: '550px',
      data: this.listDelete
    });

    dialogRef.afterClosed().subscribe(result => {
      var res = result;
      if (res) {
        this.notifier.notify('success', 'Xoá thành công !');
        this.GetData();
      }
    });
  }
  openDialogDeleteAll(): void {
    var model = this.selection.selected;
    if (model.length > 0) {
      this.listDelete = model;
      const dialogRef = this.dialog.open(UnitDeleteComponent, {
        width: '550px',
        data: this.listDelete,
      });

      dialogRef.afterClosed().subscribe(result => {
        var res = result;
        if (res) {
          this.notifier.notify('success', 'Xoá thành công !');
          this.GetData();
        }
      });
    }
    else
      this.notifier.notify('warning', "Bạn chưa chọn đơn vị tính nào !");

  }
  //searchQueryDialog
  searchQueryDialog(): void {
    const dialogRef = this.dialog.open(FormSearchWareHouseComponent, {
      width: '550px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var res = result;
      this.model.key = res.key;
    //  this.model.active = res.inactive;
      this.GetData();
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceRole.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSourceRole.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserMaster): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}

