import { UnitValidator } from './../../validator/UnitValidator';
import { Unit } from './../../entity/Unit';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-WareHouseBook',
  templateUrl: './WareHouseBook.component.html',
  styleUrls: ['./WareHouseBook.component.scss']
})
export class WareHouseBookComponent implements OnInit {
  model!: Unit;
  message: object | undefined;
  formUnitTest = new FormGroup({
    unitName: new FormControl(this.model?.unitName)
  });
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn("value to form");
    console.warn(this.formUnitTest.value);
    var test = new UnitValidator();
    console.warn(test.validate(this.formUnitTest.value));
  }
}
