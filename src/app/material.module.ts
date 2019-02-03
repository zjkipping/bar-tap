import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
} from '@angular/material';

const MatModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
]

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules,
})
export class MaterialModule {}
