import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material/tree";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { WareHouseLimitCreateComponent } from "src/app/method/create/WareHouseLimitCreate/WareHouseLimitCreate.component";
import { WareHouseLimitDeleteComponent } from "src/app/method/delete/WareHouseLimitDelete/WareHouseLimitDelete.component";
import { WareHouseDetailsComponent } from "src/app/method/details/WareHouseDetails/WareHouseDetails.component";
import { WareHouseLimitEditComponent } from "src/app/method/edit/WareHouseLimitEdit/WareHouseLimitEdit.component";
import { FormSearchWareHouseComponent } from "src/app/method/search/FormSearchWareHouse/FormSearchWareHouse.component";
import { FormSearchWareHouseBookComponent } from "src/app/method/search/formSearchWareHouseBook/formSearchWareHouseBook.component";
import { ResultMessageResponse } from "src/app/model/ResultMessageResponse";
import { TreeView } from "src/app/model/TreeView";
import { WareHouseBookDTO } from "src/app/model/WareHouseBookDTO";
import { WareHouseBookSearchModel } from "src/app/model/WareHouseBookSearchModel";
import { WareHouseLimitDTO } from "src/app/model/WareHouseLimitDTO";
import { WarehouseService } from "src/app/service/warehouse.service";
import { WareHouseBookService } from "src/app/service/WareHouseBook.service";
import { InwardDTO } from 'src/app/model/InwardDTO';
import { InwarDetailsEditComponent } from "src/app/method/edit/InwarDetailsEdit/InwarDetailsEdit.component";

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  key: string;
}
@Component({
  selector: 'app-WareHouseBook',
  templateUrl: './WareHouseBook.component.html',
  styleUrls: ['./WareHouseBook.component.scss']
})
export class WareHouseBookComponent implements OnInit {
  //
  //
  listDelete: WareHouseBookDTO[] = [];
  //select
  selection = new SelectionModel<WareHouseBookDTO>(true, []);
  //noti
  private readonly notifier!: NotifierService;
  //tree-view
  modelCreate: WareHouseBookDTO[] = [];
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
  displayedColumns: string[] = ['select', 'id', 'type', 'voucherCode', 'voucherDate', 'wareHouseName', 'deliver', 'receiver', 'reason', 'createdBy', 'modifiedBy', 'method'];
  dataSource = new MatTableDataSource<WareHouseBookDTO>();
  model: WareHouseBookSearchModel = {
    active: null,
    keySearch: '',
    skip: this.currentPage * this.pageSize,
    take: this.pageSize,
    typeWareHouseBook: null,
    fromDate: null,
    toDate: null,
    wareHouseId: null
  };
  list: ResultMessageResponse<WareHouseBookDTO> = {
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
  message: object | undefined;
  //tree-view
  private _transformer = (node: TreeView, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      key: node.key
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

  constructor(private route: Router, private service: WareHouseBookService, private serviceW: WarehouseService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, notifierService: NotifierService) {
    this.notifier = notifierService;
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.GetData();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.selection.clear();
    this.serviceW.getTreeView().subscribe(x => this.dataSourceTreee.data = x.data);

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
    this.service.getList(this.model).subscribe(list => {
      this.dataSource.data = list.data; setTimeout(() => {
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
    this.model.skip = event.pageIndex * event.pageSize;
    this.model.take = event.pageSize;
    this.GetData();
  }
  searchQuery() {
    var val = document.getElementById("searchInput") as HTMLInputElement;
    this.model.keySearch = val.value;
    this.model.active = this.checkedl;
    this.GetData();
  }
  openDialog(model: InwardDTO): void {
    if (model.id !== null) {
      this.route.navigate(['/edit-inward', model.id]);
    }
    else
      this.notifier.notify('warning', "Xin vui lòng thử lại !");
  }
  openDialogDetals(model: InwardDTO): void {
    const dialogRef = this.dialog.open(WareHouseDetailsComponent, {
      width: '550px',
      data: model,
    });
  }
  openDialogCreate(): void {
    // var idCheck: string | null = null;
    // var selectDelete = document.querySelectorAll("#treeview button");
    // selectDelete.forEach(element => {
    //   if (element.className.includes("activeButtonTreeView"))
    //     idCheck = element.getAttribute("id");
    // });

    // if (idCheck !== null) {
    //   this.service.AddIndex(idCheck).subscribe(x => {
    //     this.modelCreate = x.data;
    //     const dialogRef = this.dialog.open(WareHouseLimitCreateComponent, {
    //       width: '550px',
    //       data: this.modelCreate
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //       var res = result;
    //       if (res) {
    //         this.notifier.notify('success', 'Chỉnh sửa thành công !');
    //         this.GetData();
    //       }
    //     });
    //   });
    // }
    // else
    //   this.notifier.notify('warning', "Bạn chưa chọn kho nào !");
  }

  openDialogDelelte(model: WareHouseBookDTO): void {
    this.listDelete.push(model);
    const dialogRef = this.dialog.open(WareHouseLimitDeleteComponent, {
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
      const dialogRef = this.dialog.open(WareHouseLimitDeleteComponent, {
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
      this.notifier.notify('warning', "Bạn chưa chọn phiếu nào !");

  }


  createInward() {
    var idCheck: string | null = null;
    var selectDelete = document.querySelectorAll("#treeview button");
    selectDelete.forEach(element => {
      if (element.className.includes("activeButtonTreeView"))
        idCheck = element.getAttribute("id");
    });
    if (idCheck !== null) {
      this.route.navigate(['/create-inward', idCheck]);
    }
    else
      this.notifier.notify('warning', "Bạn chưa chọn kho nào !");
  }


  createOutward() {
    var idCheck: string | null = null;
    var selectDelete = document.querySelectorAll("#treeview button");
    selectDelete.forEach(element => {
      if (element.className.includes("activeButtonTreeView"))
        idCheck = element.getAttribute("id");
    });
    if (idCheck !== null) {
      this.route.navigate(['/create-outward', idCheck]);
    }
    else
      this.notifier.notify('warning', "Bạn chưa chọn kho nào !");
  }
  //searchQueryDialog
  searchQueryDialog(): void {
    const dialogRef = this.dialog.open(FormSearchWareHouseBookComponent, {
      width: '550px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var res = result;
      this.model.keySearch = res.key;
      this.model.active = res.inactive;
      this.model.fromDate = res.end !== null ? new Date(res.start).toLocaleDateString() : null;
      this.model.toDate = res.start !== null ? new Date(res.end).toLocaleDateString() : null;
      this.GetData();
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  GetActive(e: any) {
    var select = document.getElementById(e.key) as HTMLButtonElement;
    var selectDelete = document.querySelectorAll("#treeview button");
    selectDelete.forEach(element => {
      element.className = element.className.replace("activeButtonTreeView", " ");
    });
    select.className += " activeButtonTreeView";
    this.model.wareHouseId = e.key;
    this.GetData();
  }

  GetAll() {
    var selectDelete = document.querySelectorAll("#treeview button");
    selectDelete.forEach(element => {
      element.className = element.className.replace("activeButtonTreeView", " ");
    });
    this.model.wareHouseId = null;
    this.GetData();
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: WareHouseBookDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}



