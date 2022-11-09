import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { getProperty } from 'src/app/shared/helpers';
import { ICharacterModel, IHeroClassModel, IStats } from 'src/app/shared/interfaces';
import { CharacterListService } from '../../services/character-list.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    characterView = new Subject<ICharacterModel>();
    character: ICharacterModel;
    statsArr: any[] = [];
    constructor(
        private readonly characterService: CharacterListService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(switchMap((data) => this.characterService.get(data['id'])))
            .subscribe((character) => {
                this.characterView.next(character);
            });

        this.characterView
            .pipe(
                tap((data) => {
                    this.character = data;
                    this.statsArr = objectToArray(data.assignedHeroClass, ['characters', 'id', 'name', 'role']);
                })
            )
            .subscribe();
    }
}
function objectToArray(obj: IHeroClassModel, exclude: string[]) {
    let result = [];
    let k: keyof IHeroClassModel;
    for (k in obj) {
        if (!exclude.includes(k)) {
            result.push({ statName: k, statValue: getProperty(obj, k) });
        }
    }
    return result;
}
