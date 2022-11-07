import { NgModule } from '@angular/core';
import { XenobladeSharedModule } from '../shared';
import { CharacterRouting } from './character-routing.module';
import { CharacterListComponent } from './components/character-list/character-list.component';

import { CharacterListService } from './services/character-list.service';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
    providers: [CharacterListService],
    declarations: [CharacterListComponent, DetailComponent],
    imports: [CharacterRouting, XenobladeSharedModule]
})
export class CharacterModule {}
