import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { VendorService } from 'src/app/service/VendorService.service';
import { ResultMessageResponse } from 'src/app/model/ResultMessageResponse';
import { VendorDTO } from 'src/app/model/VendorDTO';
import { VendorSearchModel } from 'src/app/model/VendorSearchModel';
import { TreeView } from 'src/app/model/TreeView';
import { ExampleFlatNode } from 'src/app/model/ExampleFlatNode';
import { WareHouseBenginingComponent } from '../WareHouseBengining/WareHouseBengining.component';
import { VendorEditComponent } from 'src/app/method/edit/VendorEdit/VendorEdit.component';

@Component({
  selector: 'app-Vendor',
  templateUrl: './Vendor.component.html',
  styleUrls: ['./Vendor.component.scss']
})
export class VendorComponent implements OnInit {
  //tree-view
  private _transformer = (node: TreeView, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

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
  checkSizeWindows: boolean = true;
  public getScreenWidth: any;
  public getScreenHeight: any;
  //
  panelOpenState = false;
  animal: string = '';
  name: string = '';
  checkedl = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 50, 100];
  displayedColumns: string[] = ['id', 'name', 'code', 'address', 'phone', 'email','contactPerson', 'inactive', 'method'];
  dataSource = new MatTableDataSource<VendorDTO>();
  model: VendorSearchModel = {
    active: null,
    keySearch: '',
    skip: this.currentPage * this.pageSize,
    take: this.pageSize
  };
  list: ResultMessageResponse<VendorDTO> = {
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
  constructor(private service: VendorService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.GetData();
    this.service.getTreeView().subscribe(x => this.dataSourceTreee.data = x.data);
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;


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
  lll(l: string) {
    console.log(l);
    // var val = document.getElementById("searchInput") as HTMLInputElement;
    // this.model.keySearch =l;
    // this.model.active=this.checkedl;
    // this.GetData();
  }
  GetData() {
    this.service.getList(this.model).subscribe(list => {
      this.dataSource.data = list.data; setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = list.totalCount;
      });
    });
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
  openDialog(model:VendorDTO): void {
    var val = document.getElementById("searchInput") as HTMLInputElement;

    const dialogRef = this.dialog.open(VendorEditComponent, {
      width: '550px',
      data: model,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
