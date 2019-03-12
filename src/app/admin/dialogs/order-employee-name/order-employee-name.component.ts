import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '@types';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-order-employee-name',
  templateUrl: './order-employee-name.component.html',
  styleUrls: ['./order-employee-name.component.scss']
})
export class OrderEmployeeNameComponent implements OnInit {
  @Input() barId?: string;
  @Input() employeeId?: string;

  employee?: Observable<Employee | undefined>;

  constructor(private bt: BarTapApi) { }

  ngOnInit() {
    if(this.barId && this.employeeId){
      this.employee = this.bt.getBarEmployee(this.barId, this.employeeId)
    }
  }

}
