import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  value?: any;
  confirmBtn?: string;
  cancelBtn?: string;
  message?: string;
}

@Component({
  selector: 'confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  dialogData: ConfirmDialogData = {
    confirmBtn: 'Yes',
    cancelBtn: 'Cancel',
    message: 'Are you sure?',
    value: true
  }

  set confirmDialogData(data: ConfirmDialogData) {
    this.dialogData = { ...this.dialogData, ...data };
  }

  confirm() { this.dialogRef.close(this.dialogData.value) }
  cancel() { this.dialogRef.close() };

}
