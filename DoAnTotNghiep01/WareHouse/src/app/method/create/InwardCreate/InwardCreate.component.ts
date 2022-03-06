import { HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'src/app/extension/Guid';
import { InwardDTO } from 'src/app/model/InwardDTO';
import { InwardService } from 'src/app/service/Inward.service';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { InwarDetailsCreateComponent } from '../InwarDetailsCreate/InwarDetailsCreate.component';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { InwardDetailDTO } from 'src/app/model/InwardDetailDTO';

@Component({
  selector: 'app-InwardCreate',
  templateUrl: './InwardCreate.component.html',
  styleUrls: ['./InwardCreate.component.scss']
})
export class InwardCreateComponent implements OnInit {
  form!: FormGroup;
  dt: InwardDTO = {
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
    vendorDTO: [],
    domainEvents: []
  };
  private readonly notifier!: NotifierService;
  displayedColumns: string[] = ['id', 'itemId', 'unitId', 'uiquantity', 'uiprice'];
  dataSource = new MatTableDataSource<InwardDetailDTO>();
  @ViewChild(MatTable)
  table!: MatTable<InwardDetailDTO>;

  constructor(private serviceBook: WareHouseBookService, notifierService: NotifierService, public dialog: MatDialog, private formBuilder: FormBuilder, private route: ActivatedRoute, private service: InwardService) {
    this.notifier = notifierService;
  }
  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 64 - 55 - clientHeight.clientHeight + "px";
  }
  ngOnInit() {
    const getScreenHeight = window.innerHeight;
    var clientHeight = document.getElementById('formCreate') as HTMLFormElement;
    const table = document.getElementById("formTable") as HTMLDivElement;
    table.style.height = getScreenHeight - 64 - 55 -clientHeight.clientHeight + "px";
    this.getCreate();
    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      voucherCode: null,
      voucherDate: new Date().toISOString().slice(0, 16),
      wareHouseId: this.route.snapshot.paramMap.get('whid'),
      deliver: null,
      receiver: null,
      vendorId: null,
      reason: null,
      reasonDescription: null,
      description: null,
      reference: null,
      createdDate: new Date().toISOString().slice(0, 16),
      createdBy: null,
      modifiedDate: null,
      modifiedBy: null,
      deliverPhone: null,
      deliverAddress: null,
      deliverDepartment: null,
      receiverPhone: null,
      receiverAddress: null,
      receiverDepartment: null,
      inwardDetails: null
    });
  }

  getCreate() {
    const whid = this.route.snapshot.paramMap.get('whid');
    this.service.AddIndex(whid).subscribe(x => {
      this.dt = x.data;
    });

  }

  addData() {
    this.serviceBook.AddInwarDetailsIndex().subscribe(x => {
      const model = x.data;
      model.inwardId = this.form.value["id"];
      const dialogRef = this.dialog.open(InwarDetailsCreateComponent, {
        width: '450px',
        data: model
      });

      dialogRef.afterClosed().subscribe(result => {
        var res = result;
        console.log(res);
        if (res) {
          this.dataSource.data.push(res);
          this.table.renderRows();
        }
      });

    });

  }

  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
  }

  onSubmit() {
    console.log(this.form.value)
    // var test = new UnitValidator();
    // var msg = test.validate(this.form.value);
    // var check = JSON.stringify(msg) == '{}';
    // if (check == true)
    //   this.service.Add(this.form.value).subscribe(x => {
    //     if (x.success)
    //       this.dialogRef.close(x.success)
    //     else
    //       this.notifier.notify('error', x.errors["msg"][0]);
    //   }
    //   );
    // else {
    //   var message = '';
    //   for (const [key, value] of Object.entries(msg)) {
    //     message = message + " " + value;
    //   }
    //   this.notifier.notify('error', message);
    // }

  }
}
