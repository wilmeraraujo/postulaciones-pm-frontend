import { TestBed } from '@angular/core/testing';

import { PagoSoportadoService } from './pago-soportado.service';

describe('PagoSoportadoService', () => {
  let service: PagoSoportadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoSoportadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
