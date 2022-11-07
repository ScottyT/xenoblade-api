import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'xb-card',
    template: `
        <mat-card [ngClass]="isRoute ? 'card card__link' : 'card'">
            <mat-card-title>{{ headerText }}</mat-card-title>
            <div class="card__body">
                <ng-content></ng-content>
            </div>
        </mat-card>
    `,
    styles: [
        `
            .card {
                &__link {
                    cursor: pointer;
                }
            }
        `
    ]
})
export class XenobladeCardComponent {
    @Input() public isRoute: boolean = false;
    @Input() public headerText: string = '';
    constructor() {}
}
