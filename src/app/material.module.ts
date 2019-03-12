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
  MatSliderModule,
  MatTabsModule
} from '@angular/material';

//import {MatTableModule} from '@angular/material/table';


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
  MatSliderModule,
  MatTabsModule
];

// Module that houses our Material Module Component imports (to keep app.module clean)
@NgModule({
  imports: MatModules,
  exports: MatModules,
  providers: [MatDatepickerModule]
})
export class MaterialModule {}
