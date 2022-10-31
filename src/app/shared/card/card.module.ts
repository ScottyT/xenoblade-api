import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { XenobladeCardComponent } from './card.component';

@NgModule({
    imports: [CommonModule, MatCardModule],
    declarations: [XenobladeCardComponent],
    exports: [XenobladeCardComponent]
})
export class XenobladeCardModule {}
