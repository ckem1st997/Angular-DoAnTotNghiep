import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorDTO } from 'src/app/model/VendorDTO';
import { VendorValidator } from 'src/app/validator/VendorValidator';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-VendorEdit',
  templateUrl: './VendorEdit.component.html',
  styleUrls: ['./VendorEdit.component.scss']
})
export class VendorEditComponent implements OnInit {
  title = "Chỉnh sửa nhà cung cấp";
  form!: FormGroup;
  dt!: VendorDTO;
  options!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<VendorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VendorDTO,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.dt = this.data;
    this.form = this.formBuilder.group({
      id: this.dt.id,
      code: this.dt.code,
      name: this.dt.name,
      address: this.dt.address,
      phone: this.dt.phone,
      email: this.dt.email,
      contactPerson: this.dt.contactPerson,
      inactive: this.dt.inactive,
    });
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.form);
    var test = new VendorValidator();
    console.warn(test.validate(this.form.value));
    //  this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }


  }
}

