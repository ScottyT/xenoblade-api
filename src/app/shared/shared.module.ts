import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XenobladeCardComponent } from './card/card.component';
import { XenobladeCardModule } from './card/card.module';
import { XenobladeLoaderModule } from './loader';

@NgModule({
    //imports: [CommonModule, FormsModule, XenobladeCardModule, XenobladeLoaderModule],
    exports: [XenobladeCardModule, XenobladeLoaderModule, CommonModule]
})
export class XenobladeSharedModule {}
