import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /// active to click
  changActive(e: any): void {
    var check = e.target.className;
    if (check.includes("mat-icon")) {
      check=e.target.parentElement.className;
      if (check !== undefined && !check.includes("active")) {
        var elementA = document.getElementsByClassName("header-a");
        for (let index = 0; index < elementA.length; index++) {
          const element = elementA[index];
          element.classList.remove("active");
        }
        e.target.parentElement.classList.add("active");
      }
    }
    else
      if (check !== undefined && !check.includes("active")) {
        var elementA = document.getElementsByClassName("header-a");
        for (let index = 0; index < elementA.length; index++) {
          const element = elementA[index];
          element.classList.remove("active");
        }
        e.target.classList.add("active");
      }
  }

}
