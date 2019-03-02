import { Component, Input } from '@angular/core';
import { Employee } from '@types';

@Component({
  selector: 'app-employee-status-list',
  templateUrl: './employee-status-list.component.html',
  styleUrls: ['./employee-status-list.component.scss']
})
export class EmployeeStatusListComponent {
  @Input() employees?: Employee[];

  constructor() { }
}
