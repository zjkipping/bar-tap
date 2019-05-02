import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

import { Bar } from '@types';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent {
  barsSearchBar = new FormControl();
  bars: Observable<Bar[]>;

  constructor(private db: AngularFirestore, private api: BarTapApi) {
    const barList = this.api.getBars();

    const barFilter = this.barsSearchBar.valueChanges.pipe(
      startWith(''),
      debounceTime(200)
    );

    this.bars = combineLatest(barList, barFilter).pipe(
      map(([bars, filter]) =>
        bars.filter(bar =>
          bar.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }
}
