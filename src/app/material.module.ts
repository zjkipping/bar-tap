import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule
} from "@angular/material";

const MatModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule
];

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules
})
export class MaterialModule {}
