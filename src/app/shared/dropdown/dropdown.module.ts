import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { XbDropdownComponent } from './dropdown.component';

@NgModule({
    declarations: [XbDropdownComponent],
    imports: [CommonModule, MatSelectModule, ReactiveFormsModule, FormsModule],
    exports: [XbDropdownComponent]
})
export class XbDropdownModule {}
