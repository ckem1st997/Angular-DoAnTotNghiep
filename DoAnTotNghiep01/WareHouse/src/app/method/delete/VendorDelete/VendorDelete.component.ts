import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Guid } from 'src/app/extension/Guid';
import { VendorDTO } from 'src/app/model/VendorDTO';
import { VendorService } from 'src/app/service/VendorService.service';
import { VendorValidator } from 'src/app/validator/VendorValidator';

@Component({
  selector: 'app-VendorDelete',
  templateUrl: './VendorDelete.component.html',
  styleUrls: ['./VendorDelete.component.scss']
})
export class VendorDeleteComponent implements OnInit {
  title = "Xoá nhà cung cấp !"
  private readonly notifier!: NotifierService;
  success = false;
  form!: FormGroup;
  dt!: VendorDTO;
  options!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<VendorDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VendorDTO,
    private formBuilder: FormBuilder,
    private service: VendorService,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }
  ngOnInit() {
    this.dt = this.data;
    this.form = this.formBuilder.group({
      id: this.dt.id,
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onSubmit() {
    var ids = Array<string>();
    if (this.dt.id != undefined && this.dt.id != null) {
      ids.push(this.dt.id);
      console.log(ids);
      this.service.DeleteVendor(ids).subscribe(x => {
        if (x.success)
          this.dialogRef.close(x.success)
        else
          this.notifier.notify('error', x?.errors["msg"][0]);
      }
      );
    }
    else this.notifier.notify('error', 'Có lỗi xảy ra, xin vui lòng thử lại !');

  }
}

