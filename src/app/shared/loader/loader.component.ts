import { Component, Input } from '@angular/core';
import { LoadingModeEnum } from '../enums';

@Component({
    selector: 'xb-loader',
    template: `
        <div class="loader" *ngIf="loadingMode == 'progress-bar'; else skeletonLoader">
            <ng-container *ngTemplateOutlet="progressBar"></ng-container>
        </div>

        <ng-template #progressBar>
            <mat-card>
                <mat-card-header>
                    <mat-card-title>{{ loadingText }}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                </mat-card-content>
            </mat-card>
        </ng-template>

        <ng-template #skeletonLoader>
            <div class="skeleton-loader">
                <ngx-skeleton-loader
                    animation="pulse"
                    [theme]="{ 'background-color': skeletonColor, 'height': '100px' }"
                ></ngx-skeleton-loader>
            </div>
        </ng-template>
    `,
    styles: [
        `
            .skeleton-loader {
                height: 150px;
            }
        `
    ]
})
export class XenobladeLoaderComponent {
    @Input() loadingText: string = 'Loading...';
    @Input() loadingMode: string = LoadingModeEnum.ProgressBar;
    @Input() skeletonColor?: string;

    constructor() {
        // Empty
    }
}
