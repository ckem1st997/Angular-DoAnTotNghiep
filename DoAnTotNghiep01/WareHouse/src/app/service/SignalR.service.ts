
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InwardEditComponent } from '../method/edit/InwardEdit/InwardEdit.component';
import { InwarDetailsEditComponent } from '../method/edit/InwarDetailsEdit/InwarDetailsEdit.component';
import { ResultMessageResponse } from '../model/ResultMessageResponse';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseUrl = environment.baseSignalr + "signalr";
  private hubConnection!: signalR.HubConnection;
  changeInward: string = "";
  private msgSignalrSource = new Subject<ResultMessageResponse<string>>();
  msgReceived$ = this.msgSignalrSource.asObservable();

  public constructor(){

  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public WareHouseBookTrachking() {
    this.hubConnection.on("WareHouseBookTrachkingToCLient", (data:ResultMessageResponse<string>) => {
    //  this.changeInward = data;
      this.msgSignalrSource.next(data);
    });
  }
  public SendWareHouseBookTrachking(id:string) {
    this.hubConnection.send("wareHouseBookTrachking", id);
  }
}