import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ICharacterModel } from 'src/app/shared/interfaces';
import { apiUrl } from 'src/app/shared';

@Injectable({
    providedIn: 'root'
})
export class CharacterListService {
    public loadingData$ = new BehaviorSubject(true);
    constructor(private readonly http: HttpClient) {}

    public getAll(): Observable<ICharacterModel[]> {
        return this.http.get<ICharacterModel[]>(`${apiUrl}/Characters`);
    }

    public get(id: string): Observable<ICharacterModel> {
        return this.http.get<ICharacterModel>(`${apiUrl}/Characters/${id}`);
    }

    public saveCharacter(character: ICharacterModel): Observable<string> {
        return this.http.post<string>(`${apiUrl}/Characters`, character);
    }

    public getUpdatedCharacter(id: string, heroClassId: string): Observable<ICharacterModel> {
        return this.http.get<ICharacterModel>(
            `${apiUrl}/Characters/GetUpdatedCharacter?characterId=${id}&heroClassId=${heroClassId}`
        );
    }

    public modStats(character: ICharacterModel) {
        const modCharacter = { ...character };
        modCharacter.health = character.assignedHeroClass.health * character.health;
        modCharacter.attack = character.assignedHeroClass.attack * character.attack;
        modCharacter.healingPower = character.assignedHeroClass.healingPower * character.healingPower;
        modCharacter.dexterity = character.assignedHeroClass.dexterity * character.dexterity;
        modCharacter.agility = character.assignedHeroClass.agility * character.agility;

        return modCharacter;
    }
}
