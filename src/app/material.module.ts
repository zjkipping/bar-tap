import { NgModule } from '@angular/core';
import {
  MatButtonModule
} from '@angular/material';

const MatModules = [
  MatButtonModule
]

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules,
})
export class MaterialModule {}
