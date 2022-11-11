import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { ICharacterModel, IHeroClassModel, IStats } from 'src/app/shared/interfaces';
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
    character: ICharacterModel;
    statsArr: IStat[] = [];
    modifiedCharacter = new CharacterBuilder();
    role: string;
    constructor(
        public readonly characterService: CharacterListService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(switchMap((data) => this.characterService.get(data['id'])))
            .subscribe((character) => {
                this.characterService.loadingData$.next(false);
                this.characterView.next(character);
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

    leveling(growth: string, character: ICharacterModel) {
        if (growth == 'addition') {
            this.modifiedCharacter
                .incrementLevel(1)
                .setCharacterHealth(this.character.health + 79, this.character.health + 81)
                .setAttack(this.character.attack + 10, this.character.attack + 8)
                .set(this.character);

            if (this.role == 'Defender' || this.role == 'Attacker') {
                this.modifiedCharacter.setHealingPower(50, 'addition').setDexterity(175, 'addition');
            }
            if (this.role == 'Defender') {
                this.modifiedCharacter.setAgility(220, 'addition');
            } else {
                this.modifiedCharacter.setHealingPower(100, 'addition').setDexterity(125, 'addition');
            }

            this.characterView.next(this.modifiedCharacter.build());
        }
        if (growth == 'subtract') {
            this.modifiedCharacter
                .decrementLevel(1)
                .setCharacterHealth(this.character.health - 81, this.character.health - 79)
                .setAttack(this.character.attack - 8, this.character.attack - 10)
                .set(this.character);

            if (this.role == 'Defender' || this.role == 'Attacker') {
                this.modifiedCharacter.setHealingPower(50, 'subtract').setDexterity(175, 'subtract');
            }
            if (this.role == 'Defender') {
                this.modifiedCharacter.setAgility(220, 'subtract');
            } else {
                this.modifiedCharacter.setHealingPower(100, 'subtract').setDexterity(125, 'subtract');
            }
            this.characterView.next(this.modifiedCharacter.build());
        }
    }
}
function objectToArray(character: ICharacterModel, exclude: string[]): IStat[] {
    let result: IStat[] = [];
    //let k: keyof ICharacterModel;
    for (const [k, v] of Object.entries(character)) {
        if (!exclude.includes(k)) {
            result.push({ statName: k, statValue: v as number });
        }
    }
    return result;
}
