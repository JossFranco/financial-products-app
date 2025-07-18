import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when confirmed', () => {
    const confirmSpy = jest.spyOn(component.confirmClick, 'emit');
    component.confirm();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should emit event when close', () => {
    const closeSpy = jest.spyOn(component.cancelClick, 'emit');
    component.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});
