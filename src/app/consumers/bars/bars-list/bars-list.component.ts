import { Component, Input } from '@angular/core';
import { BarTapApi } from '@api';
import { Observable } from 'rxjs';
import { Bar } from '@types';

@Component({
  selector: 'app-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss']
})
export class BarsListComponent {
  @Input() bars: Observable<Bar[]> | undefined;

  constructor(private api: BarTapApi) {


}
}
