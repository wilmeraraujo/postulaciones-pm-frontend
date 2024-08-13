import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSoportadoComponent } from './pago-soportado.component';

describe('PagoSoportadoComponent', () => {
  let component: PagoSoportadoComponent;
  let fixture: ComponentFixture<PagoSoportadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoSoportadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoSoportadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
