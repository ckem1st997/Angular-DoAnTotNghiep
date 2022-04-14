import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { BaseSelectDTO } from 'src/app/model/BaseSelectDTO';
import { OutwardDetailDTO } from 'src/app/model/OutwardDetailDTO';
import { OutwardDTO } from 'src/app/model/OutwardDTO';
import { UnitDTO } from 'src/app/model/UnitDTO';
import { WareHouseItemDTO } from 'src/app/model/WareHouseItemDTO';
import { OutwardService } from 'src/app/service/Outward.service';
import { SignalRService } from 'src/app/service/SignalR.service';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { OutwardValidator } from 'src/app/validator/OutwardValidator';
import { environment } from 'src/environments/environment';
import { OutwardDetailDetailsComponent } from '../OutwardDetailDetails/OutwardDetailDetails.component';

@Component({
  selector: 'app-OutwardDetails',
  templateUrl: './OutwardDetails.component.html',
  styleUrls: ['./OutwardDetails.component.scss']
})
export class OutwardDetailsComponent implements OnInit  {
  baseAPI: string = environment.baseApi;

  form!: FormGroup;
  listDetails = Array<OutwardDetailDTO>();
  listItem = Array<WareHouseItemDTO>();
  listUnit = Array<UnitDTO>();
  getDepartmentDTO = Array<BaseSelectDTO>();
  getEmployeeDTO = Array<BaseSelectDTO>();
  getStationDTO = Array<BaseSelectDTO>();
  getProjectDTO = Array<BaseSelectDTO>();
  getCustomerDTO = Array<BaseSelectDTO>();
  dt: OutwardDTO = {
    id: "",
    voucherCode: null,
    voucherDate: null,
    wareHouseId: null,
    deliver: null,
    receiver: null,
    vendorId: null,
    reason: null,
    reasonDescription: null,
    description: null,
    reference: null,
    createdDate: null,
    createdBy: null,
    modifiedDate: null,
    modifiedBy: null,
    deliverPhone: null,
    deliverAddress: null,
    deliverDepartment: null,
    receiverPhone: null,
    receiverAddress: null,
    receiverDepartment: null,
    wareHouseDTO: [],
    domainEvents: [],
    voucher: null,
    getCreateBy: [],
    outwardDetails: [],
    toWareHouseId: null
  };
  private readonly notifier!: NotifierService;
  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'uiquantity', 'uiprice', 'amount', 'departmentName', 'employeeName', 'stationName', 'projectName', 'customerName', 'method'];
  dataSource = new MatTableDataSource<OutwardDetailDTO>();
  @ViewChild(MatTable)
  table!: MatTable<OutwardDetailDTO>;
  private subscriptions = new Subscription();
  constructor(private router1:Router,public signalRService: SignalRService, private serviceBook: WareHouseBookService, notifierService: NotifierService, public dialog: MatDialog, private formBuilder: FormBuilder, private route: ActivatedRoute, private service: OutwardService) {
    this.notifier = notifierService;
    this.route.params.subscribe(param =>console.log(param));
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize(): void {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    var clientHeightForm = document.getElementById('formCreateDiv') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 75 - clientHeight.clientHeight + "px";
    clientHeightForm.style.paddingTop = clientHeight.clientHeight + "px";
  }


  ngOnInit() {
    // this.router1.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //    console.log(event)
    //   }
    // })
    
    this.onWindowResize();
    this.getData();
    this.form = this.formBuilder.group({
      id: null,
      voucherCode: null,
      voucher: this.dt.voucher,
      voucherDate: new Date().toISOString().slice(0, 16),
      wareHouseId: null,
      deliver: null,
      receiver: null,
      vendorId: null,
      reason: null,
      reasonDescription: null,
      description: null,
      reference: null,
      createdDate: new Date().toISOString().slice(0, 16),
      createdBy: null,
      modifiedDate: new Date().toISOString().slice(0, 16),
      modifiedBy: null,
      deliverPhone: null,
      deliverAddress: null,
      deliverDepartment: null,
      receiverPhone: null,
      receiverAddress: null,
      receiverDepartment: null,
      OutwardDetails: null,
      toWareHouseId: null

    });
    this.signalRService.WareHouseBookTrachking();
    this.signalRService.msgReceived$.subscribe(x => {
      if (x.success) {
        if (this.form.value["id"] === x.data) {
          this.getData();
          this.notifier.notify('success', x.message);
        }
      }
    });
  }

  getData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null)
      this.service.Details(id).subscribe(x => {
        this.dt = x.data;
        this.listDetails = this.dt.outwardDetails;
        this.dataSource.data = this.dt.outwardDetails;
        this.table.renderRows();
        this.form.patchValue(x.data);
      },
      );
    // đây là create
    this.serviceBook.GetDataToWareHouseBookIndex().subscribe(x => {
      this.listItem = x.data.wareHouseItemDTO;
      this.listUnit = x.data.unitDTO;
    });

  }
  getNameItem(id: string) {
    return this.listItem.find(x => x.id === id)?.name;
  }
  getNameUnit(id: string) {
    return this.listUnit.find(x => x.id === id)?.unitName;
  }


  openDialogDetails(model: OutwardDetailDTO): void {
    const dialogRef = this.dialog.open(OutwardDetailDetailsComponent, {
      width: '550px',
      data: model
    });
  }

}
