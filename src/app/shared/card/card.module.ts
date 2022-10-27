import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { XenobladeCardComponent } from './card.component';

@NgModule({
    declarations: [XenobladeCardComponent],
    imports: [CommonModule, MatCardModule],
    exports: [XenobladeCardComponent]
})
export class XenobladeCardModule {}
