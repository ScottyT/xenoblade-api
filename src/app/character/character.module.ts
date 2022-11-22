import { NgModule } from '@angular/core';
import { XbDropdownModule, XenobladeSharedModule } from '../shared';
import { CharacterRouting } from './character-routing.module';
import { CharacterListComponent } from './components/character-list/character-list.component';

import { CharacterListService } from './services/character-list.service';
import { DetailComponent } from './components/detail/detail.component';
import { CapitalizeFirstLetterPipe } from '../shared/pipes';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
    providers: [CharacterListService],
    declarations: [CharacterListComponent, ConfirmDialogComponent, DetailComponent, CapitalizeFirstLetterPipe],
    imports: [CharacterRouting, XenobladeSharedModule, XbDropdownModule, MatDialogModule]
})
export class CharacterModule {}
