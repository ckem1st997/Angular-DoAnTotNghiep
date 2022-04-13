
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InwardEditComponent } from '../method/edit/InwardEdit/InwardEdit.component';
import { InwarDetailsEditComponent } from '../method/edit/InwarDetailsEdit/InwarDetailsEdit.component';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseUrl = environment.baseSignalr + "signalr";
  private hubConnection!: signalR.HubConnection;
  changeInward: string = "";
  private message$!: Subject<string>;

  public constructor(){

  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public CallMethodToServiceByInwardChange(nameMethodCallToService: string) {
    this.hubConnection.on(nameMethodCallToService, (data) => {
      this.changeInward = data;
    });
  }
}