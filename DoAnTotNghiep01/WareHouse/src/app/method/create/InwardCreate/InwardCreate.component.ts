import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'src/app/extension/Guid';
import { InwardDTO } from 'src/app/model/InwardDTO';
import { InwardService } from 'src/app/service/Inward.service';

@Component({
  selector: 'app-InwardCreate',
  templateUrl: './InwardCreate.component.html',
  styleUrls: ['./InwardCreate.component.scss']
})
export class InwardCreateComponent implements OnInit {
  form!: FormGroup;
  dt: InwardDTO = {
    id: Guid.newGuid(),
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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private service: InwardService) {

  }

  ngOnInit() {
    this.getCreate();
    this.form = this.formBuilder.group({
      id: Guid.newGuid(),
      voucherCode: null,
      voucherDate: null,
      wareHouseId: this.route.snapshot.paramMap.get('whid'),
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
      inwardDetails: null
    });
  }

  getCreate() {
    const whid = this.route.snapshot.paramMap.get('whid');
    this.service.AddIndex(whid).subscribe(x => {
      this.dt = x.data;
    });
  }

  onSubmit() {
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
