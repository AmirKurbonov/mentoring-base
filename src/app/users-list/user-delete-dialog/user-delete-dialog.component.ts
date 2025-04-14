import { Component, inject } from "@angular/core";
import { MatDialogClose } from '@angular/material/dialog';

@Component({
    selector: 'user-delete-dialog',
    templateUrl: './user-delete-dialog.component.html',
    standalone: true,
    imports: [MatDialogClose]
})
export class UserDeleteDialogComponent {
    get yes(): boolean {
      return true
    }
    get no(): boolean {
      return false
    }
}
