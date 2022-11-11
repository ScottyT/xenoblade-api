import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { XenobladeCardComponent } from './card/card.component';
import { XenobladeCardModule } from './card/card.module';
import { XenobladeLoaderModule } from './loader';

@NgModule({
    imports: [CommonModule, FormsModule, XenobladeCardModule, XenobladeLoaderModule, MatButtonModule, MatIconModule],
    exports: [XenobladeCardModule, FormsModule, XenobladeLoaderModule, CommonModule, MatButtonModule, MatIconModule]
})
export class XenobladeSharedModule {}
