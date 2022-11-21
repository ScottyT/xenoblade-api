import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, tap, zip } from 'rxjs';
import { ICharacterModel, IHeroClassModel } from 'src/app/shared/interfaces';
import { XbHeroClassService } from 'src/app/shared/services';
import { CharacterBuilder } from '../../data/character.builder';
import { CharacterListService } from '../../services/character-list.service';
interface IStat {
    statName: string;
    statValue: number;
}
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    characterView = new Subject<ICharacterModel>();
    loadingCharacter$ = new BehaviorSubject(true);
    character: ICharacterModel;
    statsArr: IStat[] = [];
    modifiedCharacter = new CharacterBuilder();
    role: string;
    heroClassesObs$ = new BehaviorSubject<IHeroClassModel[]>([]);
    heroClasses: IHeroClassModel[] = [];
    selectedClass: IHeroClassModel;
    constructor(
        private readonly characterService: CharacterListService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly heroClassService: XbHeroClassService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                switchMap((data) => {
                    return zip(this.characterService.get(data['id']), this.heroClassService.getAll());
                })
            )
            .subscribe(([character, heroClasses]) => {
                this.loadingCharacter$.next(false);
                this.characterView.next(character);
                this.heroClassesObs$.next(heroClasses);
                this.heroClasses = heroClasses;
            });

        this.characterView
            .pipe(
                tap((data) => {
                    this.character = data;
                    this.role = data.assignedHeroClass.role;
                    this.statsArr = objectToArray(data, ['level', 'heroClassId', 'assignedHeroClass', 'id', 'name']);
                })
            )
            .subscribe();
    }

    leveling(growth: string) {
        if (growth == 'addition') {
            this.modifiedCharacter
                .incrementLevel(1, this.character.level)
                .setCharacterHealth(this.character.health + 79, this.character.health + 81)
                .setAttack(this.character.attack + 10, this.character.attack + 8)
                .set(this.character);
        }
        if (growth == 'subtract') {
            this.modifiedCharacter
                .decrementLevel(1, this.character.level)
                .setCharacterHealth(this.character.health - 81, this.character.health - 79)
                .setAttack(this.character.attack - 8, this.character.attack - 10)
                .set(this.character);
        }
        if (this.role == 'Defender' || this.role == 'Attacker') {
            this.modifiedCharacter.setHealingPower(40, this.character.healingPower, growth).setDexterity(175, growth);
        }
        if (this.role == 'Defender') {
            this.modifiedCharacter.setAgility(220, growth);
        } else {
            this.modifiedCharacter.setHealingPower(100, this.character.healingPower, growth).setDexterity(125, growth);
        }
        this.characterView.next(this.modifiedCharacter.build());
    }

    savingCharacter() {
        this.characterService.saveCharacter(this.character).subscribe();
    }

    onHeroClassChange(event: any) {
        this.role = event.value.role;
        this.heroClassService
            .read(event.value.id, this.character.id)
            .pipe(
                tap((data) => {
                    this.character.assignedHeroClass = data;
                    console.log(
                        objectToArray(data.character, ['level', 'heroClassId', 'assignedHeroClass', 'id', 'name'])
                    );
                })
            )
            .subscribe(() => {});
    }
}
function objectToArray(character: ICharacterModel, exclude: string[]): IStat[] {
    let result: IStat[] = [];

    for (const [k, v] of Object.entries(character)) {
        if (!exclude.includes(k)) {
            result.push({ statName: k, statValue: v as number });
        }
    }
    return result;
}
