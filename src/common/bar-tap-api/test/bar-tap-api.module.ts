import { NgModule } from '@angular/core';

import { BarTapApi } from '../bar-tap-api';
import { TestApi } from './test-api';

@NgModule({
  providers: [
    { provide: BarTapApi, useClass: TestApi }
  ]
})
export class BarTapApiModule { }
