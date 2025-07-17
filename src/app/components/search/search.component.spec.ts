import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit searchTerm when onSearchChange is called', () => {
        const emitSpy = jest.spyOn(component.searchTerm, 'emit');
        component.searchInput = 'test';
        component.onSearchChange();
        expect(emitSpy).toHaveBeenCalledWith('test');
    });

    it('should emit empty string when searchInput is empty', () => {
        const emitSpy = jest.spyOn(component.searchTerm, 'emit');
        component.searchInput = '';
        component.onSearchChange();
        expect(emitSpy).toHaveBeenCalledWith('');
    });
});
