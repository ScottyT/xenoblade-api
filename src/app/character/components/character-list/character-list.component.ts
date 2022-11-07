import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICharacterModel } from 'src/app/shared/interfaces';
import { CharacterListService } from '../../services/character-list.service';

@Component({
    selector: 'app-character',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
    charactersObs$ = new BehaviorSubject<ICharacterModel[]>([]);
    constructor(public characterListService: CharacterListService) {}

    ngOnInit(): void {
        this.characterListService.getAll().pipe(
            tap((data) => {
                this.charactersObs$.next(data);
            })
        );
        //.subscribe(() => this.characterListService.loadingData$.next(false));
    }

    viewCharacter(id: string) {
        window.open(`characters/detatil/${id}`);
    }
}
