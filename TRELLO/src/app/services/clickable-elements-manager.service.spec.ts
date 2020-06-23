import { TestBed } from '@angular/core/testing';

import { ClickableElementsManagerService } from './clickable-elements-manager.service';

describe('ClickableElementsManagerService', () => {
  let service: ClickableElementsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickableElementsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
