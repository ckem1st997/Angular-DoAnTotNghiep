/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendorDeleteService } from './VendorDelete.service';

describe('Service: VendorDelete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorDeleteService]
    });
  });

  it('should ...', inject([VendorDeleteService], (service: VendorDeleteService) => {
    expect(service).toBeTruthy();
  }));
});
