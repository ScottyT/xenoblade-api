import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu.component';

@NgModule({
    imports: [CommonModule, MatMenuModule],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})
export class XenobladeMenuModule {}
