import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventariocantPage } from './inventariocant.page';

describe('InventariocantPage', () => {
  let component: InventariocantPage;
  let fixture: ComponentFixture<InventariocantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariocantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
