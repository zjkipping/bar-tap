import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar-hours-panel',
  templateUrl: './bar-hours-panel.component.html',
  styleUrls: ['./bar-hours-panel.component.scss']
})
export class BarHoursPanelComponent {
  hoursKeys = Object.keys;
  @Input() hours?: any;
  constructor() {}
}
