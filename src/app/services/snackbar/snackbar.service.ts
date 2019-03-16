import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackbar: MatSnackBar) { }

  openSuccess(message: string, duration: number) {
    this.snackbar.open(
      message,
      undefined,
      {
        duration,
        panelClass: 'success-snackbar'
      }
    );
  }

  openError(message: string, duration: number) {
    this.snackbar.open(
      message,
      undefined,
      {
        duration,
        panelClass: 'error-snackbar'
      }
    );
  }
}
