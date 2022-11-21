import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
}
