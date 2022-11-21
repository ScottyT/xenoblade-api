import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/local-domain';
import { IHeroClassModel } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class XbHeroClassService {
    constructor(private readonly http: HttpClient) {
        //Empty
    }

    public read(id: string, characterId: string): Observable<IHeroClassModel> {
        return this.http.get<IHeroClassModel>(`${apiUrl}/HeroClass/Get?id=${id}&characterId=${characterId}`);
    }

    public getAll(): Observable<IHeroClassModel[]> {
        return this.http.get<IHeroClassModel[]>(`${apiUrl}/HeroClass`);
    }
}
