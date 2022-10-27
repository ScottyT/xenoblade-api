import { NgModule } from '@angular/core';
import { XenobladeCardModule, XenobladeMenuModule } from '.';
const SHARED_COMPONENTS = [XenobladeCardModule, XenobladeMenuModule];
@NgModule({
    imports: [...SHARED_COMPONENTS],
    exports: [...SHARED_COMPONENTS]
})
export class XenobladeSharedComponents {}
