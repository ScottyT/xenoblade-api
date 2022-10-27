import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { XenobladeCardModule } from '../card';
import { MenuComponent } from './menu.component';

@NgModule({
    imports: [CommonModule, MatMenuModule, XenobladeCardModule],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})
export class XenobladeMenuModule {}
