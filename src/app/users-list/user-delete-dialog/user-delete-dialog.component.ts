import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { User } from "../users-list.component";

@Component({
    selector: 'user-delete-dialog',
    templateUrl: './user-delete-dialog.component.html',
    standalone: true,
    imports: [MatDialogClose]
})
export class UserDeleteDialogComponent {

  readonly data = inject<{user: User}>(MAT_DIALOG_DATA);
  
  constructor() {
      console.log('DATA: ', this.data);
  }

  get yes(): boolean {
    return true
  }
  
  get no(): boolean {
    return false
  }
}
