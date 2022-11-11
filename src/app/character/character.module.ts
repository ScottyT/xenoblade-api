import { NgModule } from '@angular/core';
import { XenobladeSharedModule } from '../shared';
import { CharacterRouting } from './character-routing.module';
import { CharacterListComponent } from './components/character-list/character-list.component';

import { CharacterListService } from './services/character-list.service';
import { DetailComponent } from './components/detail/detail.component';
import { CapitalizeFirstLetterPipe } from '../shared/pipes';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    providers: [CharacterListService],
    declarations: [CharacterListComponent, DetailComponent, CapitalizeFirstLetterPipe],
    imports: [CharacterRouting, XenobladeSharedModule, MatButtonModule]
})
export class CharacterModule {}
