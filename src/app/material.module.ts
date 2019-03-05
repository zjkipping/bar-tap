import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatSnackBarModule
} from '@angular/material';

const MatModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatSnackBarModule
];

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules
})
export class MaterialModule {}
