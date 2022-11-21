import { Directive, Injector, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms';

@Directive()
export class ControlValueAccessorConnector implements ControlValueAccessor {
    @Input()
    public formControl: FormControl;
    @Input()
    public formControlName: string;

    get control() {
        return this.formControl;
    }
    get controlContainer() {
        return this.injector.get(ControlContainer);
    }
    @ViewChild(FormControlDirective, { static: true })
    public formControlDirective: FormControlDirective;

    constructor(protected readonly injector: Injector) {
        // Empty
    }
    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor?.writeValue(obj);
    }
    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnChange(fn);
    }
    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnTouched(fn);
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }
}
