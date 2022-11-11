import { IStats } from './stats.interface';

export interface IHeroClassModel extends IStats {
    id: string;
    name: string;
    role: string;
    // blockRate: number;
    // criticalRate: number;
    // physDefense: number;
    // etherDefense: number;
}
