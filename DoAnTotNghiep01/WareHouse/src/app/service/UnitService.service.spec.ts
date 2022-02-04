/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnitServiceService } from './UnitService.service';

describe('Service: UnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitServiceService]
    });
  });

  it('should ...', inject([UnitServiceService], (service: UnitServiceService) => {
    expect(service).toBeTruthy();
  }));
});
