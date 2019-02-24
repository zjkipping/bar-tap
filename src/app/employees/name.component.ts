import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

interface Bar {
  name: string;
}

@Component({
  selector: 'app-name',
  template: `
    <h2>Hey my name is {{nameObs | async}}</h2>
    <button (click)="addBar()">Add a bar!</button>
    <p *ngFor="let bar of bars | async">
      {{bar.name}}
    </p>
  `
})
export class NameComponent {
  nameObs: Observable<string>;
  bars: Observable<Bar[]>;
  barIndex = 5;

  constructor(route: ActivatedRoute, private fb: AngularFirestore) {
    this.nameObs = route.params.pipe(
      map<Params, string>(params => params['name']),
      map(name => name.toUpperCase())
    );

    this.bars = fb.collection<Bar>('bars').valueChanges();
  }

  addBar() {
    this.fb.collection('bars').add({ name: 'newBar' + this.barIndex++ });
  }
}
