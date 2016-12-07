/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelatorioService } from './relatorio.service';

describe('Service: Relatorio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioService]
    });
  });

  it('should ...', inject([RelatorioService], (service: RelatorioService) => {
    expect(service).toBeTruthy();
  }));
});
