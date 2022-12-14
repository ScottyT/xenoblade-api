import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';

describe('CharacterComponent', () => {
    let component: CharacterListComponent;
    let fixture: ComponentFixture<CharacterListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CharacterListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CharacterListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
