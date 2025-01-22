import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartirPresupuestoPage } from './compartir-presupuesto.page';

describe('CompartirPresupuestoPage', () => {
  let component: CompartirPresupuestoPage;
  let fixture: ComponentFixture<CompartirPresupuestoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirPresupuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
