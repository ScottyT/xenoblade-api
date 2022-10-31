import { IHeroClassModel } from './hero-class-model.interface';

export interface ICharacterModel {
    id: string;
    level: number;
    name: string;
    heroClassId?: string;
    assignedHeroClass?: IHeroClassModel;
}
