import { NgModule } from '@angular/core';
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
  MatTableModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSliderModule
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
  MatSnackBarModule,
  MatTooltipModule,
  MatTableModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSliderModule
];

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules,
  providers: [MatDatepickerModule]
})
export class MaterialModule {}
