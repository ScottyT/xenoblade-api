import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { XenobladeLoaderComponent } from './loader.component';

@NgModule({
    imports: [CommonModule, OverlayModule, MatCardModule, MatProgressBarModule, NgxSkeletonLoaderModule],
    declarations: [XenobladeLoaderComponent],
    exports: [XenobladeLoaderComponent]
})
export class XenobladeLoaderModule {}
