import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
    content: string;
    changedClass: Function;
}
@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styles: [
        `
            :host {
                display: block;
                background: #fff;
                border-radius: 8px;
                padding: 8px 16px 16px;
            }

            input {
                margin: 8px 0;
            }

            button + button {
                margin-left: 8px;
            }
        `
    ]
})
export class ConfirmDialogComponent {
    @Output() valueChanges = new EventEmitter();
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
    dismiss(event: boolean) {}
}
