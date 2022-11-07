import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: CharacterListComponent
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharacterRouting {}
