import { IBuilder, ICharacterModel } from 'src/app/shared/interfaces';

export interface IModifiedCharacter {
    id: string;
    health: number;
    level: number;
    name: string;
    attack: number;
    healingPower: number;
    dexterity: number;
    agility: number;
}
export class CharacterBuilder implements IBuilder<IModifiedCharacter> {
    private _builder: IModifiedCharacter;
    private _level: number = 1;
    private _attack: number = 0;
    private _health: number = 0;

    constructor() {
        this._builder = {
            id: '',
            health: 0,
            level: 0,
            name: '',
            attack: 0,
            healingPower: 0,
            dexterity: 0,
            agility: 0
        };
    }

    setCharacterHealth(valueEven: number, valueOdd: number): this {
        if (this._level % 2 === 0) this._health = valueEven;
        if (this._level % 2 !== 0) this._health = valueOdd;
        return this;
    }
    incrementLevel(value: number): this {
        this._level += value;
        return this;
    }
    decrementLevel(value: number): this {
        this._level -= value;
        return this;
    }
    setAttack(valueEven: number, valueOdd: number): this {
        if (this._level % 2 === 0) {
            this._attack = valueEven;
        }
        if (this._level % 2 !== 0) {
            this._attack = valueOdd;
        }

        return this;
    }
    setHealingPower(value: number, comp: string): this {
        if (comp === 'addition') this._builder.healingPower += value / 100;
        if (comp === 'subtract') this._builder.healingPower -= value / 100;
        return this;
    }
    setDexterity(value: number, comp: string): this {
        if (comp === 'addition') this._builder.dexterity += value / 100;
        if (comp == 'subtract') this._builder.dexterity -= value / 100;
        return this;
    }
    setAgility(value: number, comp: string): this {
        if (comp === 'addition') this._builder.agility += value / 100;
        if (comp == 'subtract') this._builder.agility -= value / 100;
        return this;
    }
    set(character: ICharacterModel): this {
        this._builder = { ...this._builder, ...character } as ICharacterModel;
        return this;
    }
    build(): ICharacterModel {
        this._builder.level = this._level;
        this._builder.attack = this._attack;
        this._builder.health = this._health;
        return JSON.parse(JSON.stringify(this._builder));
    }
}
