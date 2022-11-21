import { ICharacterModel } from './character-model.interface';
import { IStats } from './stats.interface';

export interface IHeroClassModel extends IStats {
    id: string;
    name: string;
    role: string;
    character: ICharacterModel;
    // blockRate: number;
    // criticalRate: number;
    // physDefense: number;
    // etherDefense: number;
}
