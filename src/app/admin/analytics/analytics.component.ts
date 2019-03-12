import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { Log, Order, AnalyticsLog, AdminUser } from '@types';
import { BarTapApi } from '@api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { OrderInfoDialogComponent } from '../dialogs/order-info-dialog/order-info-dialog.component';
import * as moment from 'moment';
import { NEW_ORDER_STATUS, FINISHED_ORDER_STATUS } from '@constants';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent{
  testBarID = 'rDdQClImI6N4RtQVuGGO';

  displayedColumns: string[] = ['employee', 'time', 'view'];
  analyticLogArray: Observable<AnalyticsLog[]>;
  startLogArray: Observable<Log[]>;
  endLogArray: Observable<Log[]>;
  user: Observable<AdminUser>;

  constructor(fb: FormBuilder,
    private bt: BarTapApi,
    private db: AngularFirestore,
    private dialog: MatDialog,
    private auth: AuthService
  ) {

    this.user = this.auth.getUserAsAdminAuth().pipe(shareReplay(1));
    this.startLogArray = this.user.pipe(
        switchMap(user => bt.getBarLogsByStatus(user.barId, NEW_ORDER_STATUS))
    );
    this.endLogArray = this.user.pipe(
      switchMap(user => bt.getBarLogsByStatus(user.barId, FINISHED_ORDER_STATUS))
    );
    //this.startLogArray = bt.getBarLogsByStatus(this.testBarID, NEW_ORDER_STATUS);

    //this.endLogArray = bt.getBarLogsByStatus(this.testBarID, FINISHED_ORDER_STATUS);

    this.analyticLogArray = combineLatest(this.startLogArray, this.endLogArray).pipe(
      map(([startLogs, endLogs]) => {
        const logFinderDictionary: { [key: string]: { startLog: Log, endLog?: Log } } = { };
        startLogs.forEach(log => {
          logFinderDictionary[log.orderId] = { startLog: log };
        });
        endLogs.forEach(log => {
          logFinderDictionary[log.orderId].endLog = log;
        });
        const arr = Object.keys(logFinderDictionary)
          .map(key => logFinderDictionary[key])
          .filter(obj => (!!obj.startLog && !!obj.endLog))
          .map(obj => {
            console.log(obj);
            return ({
            orderId: obj.startLog.orderId,
            employeeId: (obj.endLog as Log).employeeId,
            startLog: obj.startLog,
            endLog: obj.endLog as Log,
            elapsedTime: this.convertTimeIntoDuration(
              (obj.endLog as Log).timestamp - obj.startLog.timestamp)
          })});
        return arr.slice(0, Math.min(arr.length, 30));
      })
    )
   }

   convertTimeIntoDuration(time: number){
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      return minutes + " minutes, " + seconds + " seconds"
   }

   getOrderFromLog(log: Log){
      return this.bt.getBarOrder(this.testBarID, log.orderId);
   }

  viewOrder(log: Log){
      this.dialog
        .open(OrderInfoDialogComponent, {data: log})
        .afterClosed()
        .pipe(
          filter(order => !!order),            
        )
        .subscribe(
          () => console.log("Yes!"),
          error => console.log("No!")
        )
  }
}
