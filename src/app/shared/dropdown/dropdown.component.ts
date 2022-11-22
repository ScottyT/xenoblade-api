import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ISelectListData } from '../interfaces';

@Component({
    selector: 'xb-dropdown',
    template: `
        <mat-form-field appearance="fill">
            <mat-label>{{ label }}</mat-label>

            <mat-select [(ngModel)]="valueSelected" (selectionChange)="valueChanges.emit($event)">
                <mat-option *ngFor="let option of data" [value]="option">
                    {{ option.name }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => XbDropdownComponent),
            multi: true
        }
    ]
})
export class XbDropdownComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() data: ISelectListData[] = [];
    @Input() selectedValue: any;
    @Output() valueChanges = new EventEmitter();
    valueSelected: any = '';

    // Get this to go back to previous value if no selected in dialog

    onChange: any = () => {};
    onTouch: any = () => {};

    set value(val: string) {
        this.valueSelected = val;
        this.onChange(val);
        this.onTouch(val);
    }

    writeValue(obj: any): void {
        this.valueSelected = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }
}
