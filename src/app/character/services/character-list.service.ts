import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacterModel } from 'src/app/shared/interfaces';
import { apiUrl } from 'src/app/shared';

@Injectable({
    providedIn: 'root'
})
export class CharacterListService {
    constructor(private readonly http: HttpClient) {}

    public getAll(): Observable<ICharacterModel[]> {
        return this.http.get<ICharacterModel[]>(`${apiUrl}/Characters`);
    }
}
