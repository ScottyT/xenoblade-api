import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, switchMap, tap, zip } from 'rxjs';
import { ICharacterModel, IHeroClassModel } from 'src/app/shared/interfaces';
import { XbHeroClassService } from 'src/app/shared/services';
import { CharacterBuilder } from '../../data/character.builder';
import { CharacterListService } from '../../services/character-list.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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
    heroClasses: IHeroClassModel[] = [];
    selectedClass: any = null;
    selectedClassValue: any = null;
    previousSelectedClass: any = null;
    modCharacter: {};

    constructor(
        private readonly characterService: CharacterListService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly heroClassService: XbHeroClassService,
        public dialog: MatDialog
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
                this.heroClasses = heroClasses;
            });

        this.characterView
            .pipe(
                tap((data) => {
                    this.character = data;
                    this.role = data.assignedHeroClass.role;
                }),
                map((character) => this.characterService.modStats(character))
            )
            .subscribe((data) => {
                //let newCharacter = this.characterService.modStats(data);
                this.statsArr = objectToArray(data, ['level', 'heroClassId', 'assignedHeroClass', 'id', 'name']);
            });
    }

    leveling(growth: string, rate: number) {
        if (growth == 'addition') {
            this.modifiedCharacter
                .incrementLevel(rate, this.character.level)
                .setCharacterHealth(this.character.health + 79, this.character.health + 81)
                .setAttack(this.character.attack + 10, this.character.attack + 8)
                .set(this.character);
        }
        if (growth == 'subtract') {
            this.modifiedCharacter
                .decrementLevel(rate, this.character.level)
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

    onChange(event: any) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                content: 'You have unsaved changes. Do you want to proceed changing the hero class?'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.previousSelectedClass = event.value;
                this.selectedClass = event.value;
                this.onHeroClassChange(event);
            } else {
                this.selectedClass = this.previousSelectedClass;
            }
        });
    }

    onHeroClassChange(event: any) {
        this.role = event.value.role;
        this.selectedClass = event.value;
        this.heroClassService
            .read(event.value.id, this.character.id)
            .pipe(
                tap((data) => {
                    this.character.assignedHeroClass = data;
                }),
                switchMap((value) =>
                    this.characterService.getUpdatedCharacter(this.character.id, value.id).pipe(
                        tap((val) => {
                            this.statsArr = objectToArray(val, [
                                'level',
                                'heroClassId',
                                'assignedHeroClass',
                                'id',
                                'name'
                            ]);
                        })
                    )
                ),
                map((data) => this.characterService.modStats(data))
            )
            .subscribe();
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
