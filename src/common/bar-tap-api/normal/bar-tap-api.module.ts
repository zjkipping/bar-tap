import { NgModule } from '@angular/core';

import { BarTapApi } from '../bar-tap-api';
import { NormalApi } from './normal-api';

@NgModule({
  providers: [{ provide: BarTapApi, useClass: NormalApi }]
})
export class BarTapApiModule {}
