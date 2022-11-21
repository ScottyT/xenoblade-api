import { Component, EventEmitter, Injector, Input, OnInit, Output, Self } from '@angular/core';
import { ISelectListData } from '../interfaces';

@Component({
    selector: 'xb-dropdown',
    template: `
        <mat-form-field appearance="fill">
            <mat-label>{{ label }}</mat-label>
            <mat-select (selectionChange)="valueChanges.emit($event)">
                <mat-option *ngFor="let option of data" [value]="option">
                    {{ option.name }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `
})
export class XbDropdownComponent {
    @Input() label: string = '';
    @Input() data: ISelectListData[] = [];
    @Output() valueChanges = new EventEmitter();
}
