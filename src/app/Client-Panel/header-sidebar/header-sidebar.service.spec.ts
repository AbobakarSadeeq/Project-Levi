import { TestBed } from '@angular/core/testing';

import { HeaderSidebarService } from './header-sidebar.service';

describe('HeaderSidebarService', () => {
  let service: HeaderSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
