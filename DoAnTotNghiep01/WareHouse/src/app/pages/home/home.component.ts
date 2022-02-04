import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Unit } from 'src/app/entity/Unit';
import { UnitValidator } from 'src/app/validator/UnitValidator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

