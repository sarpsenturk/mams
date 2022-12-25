import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {
  }

  public notify(message: string) {
    const snackbar = this.snackbar.open(message, 'Dismiss', {duration: 2000})
    snackbar.onAction().subscribe(() => {
      snackbar.dismiss()
    })
  }
}
