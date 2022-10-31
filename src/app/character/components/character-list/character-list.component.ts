import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ICharacterModel } from 'src/app/shared/interfaces';
import { CharacterListService } from '../../services/character-list.service';

@Component({
    selector: 'app-character',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
    characters: ICharacterModel[] = [];
    constructor(
        private readonly characterListService: CharacterListService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        console.log('from character lsit component');
        this.characterListService
            .getAll()
            .pipe(
                tap((data) => {
                    this.characters = data;
                    console.log(data);
                })
            )
            .subscribe();
    }
}
