import { Component, OnInit } from '@angular/core';
import { number } from 'echarts';
import { AuthenticationService } from 'src/app/extension/Authentication.service';
import { HistoryNoticationDT0 } from 'src/app/model/HistoryNoticationDT0';
import { ResultMessageResponse } from 'src/app/model/ResultMessageResponse';
import { AuthozireService } from 'src/app/service/Authozire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  activeNoticaonList: boolean = false;
  listBefor!: HistoryNoticationDT0;
  listAfter!: HistoryNoticationDT0[];
  countHistory: number = 0;
  listHistory: ResultMessageResponse<HistoryNoticationDT0> = {
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
  };
  constructor(private service: AuthenticationService, private serviceAuthozire: AuthozireService) { }

  ngOnInit() {
    this.userName = this.service.userValue.username;
    this.serviceAuthozire.getListHistoryByUser().subscribe(res => { this.listHistory = res; this.listBefor = res.data[0]; this.listAfter = res.data.slice(1); this.countHistory = res.data.filter(x => x.read == false).length; });
  }


  getCount() {
    if (this.countHistory > 10)
      return '9+';
    else
      return this.countHistory.toString();
  }

  /// active to click
  changActive(e: any): number {

    var activeMenu = e.target.parentElement.getAttribute("data-active");
    if (activeMenu != null && activeMenu != undefined && activeMenu.length > 0) {
      var elementA = DeleteActiveAll();
      document.getElementById(activeMenu)?.classList.add("active");
      return 1;
    }
    var check = e.target.className;
    if (check.includes("mat-icon")) {
      check = e.target.parentElement.className;
      if (check !== undefined && !check.includes("active")) {
        var elementA = DeleteActiveAll();
        e.target.parentElement.classList.add("active");
      }
    }
    else
      if (check !== undefined && !check.includes("active")) {
        var elementA = DeleteActiveAll();
        e.target.classList.add("active");
      }
    return 1;

    function DeleteActiveAll() {
      var elementA = document.getElementsByClassName("header-a");
      for (let index = 0; index < elementA.length; index++) {
        const element = elementA[index];
        element.classList.remove("active");
      }
      return elementA;
    }
  }
  logout() {
    this.service.logout();
  }
  showNotication() {
    this.activeNoticaonList = !this.activeNoticaonList;
    // if (this.activeNoticaonList)
    //   this.serviceAuthozire.getListHistoryByUser().subscribe(res => { this.listHistory = res; this.listBefor = res.data[0]; this.listAfter = res.data.slice(1); });
  }

  GetDateTime(e: Date) {
    console.log(e);
    return e;
  }

  CheckMethod(method: string) {
    if (method.includes("Tạo"))
      return 1;
    else if (method.includes("Chỉnh sửa"))
      return 2;
    else if (method.includes("Xóa"))
      return 3;
    return 0;
  }
}
