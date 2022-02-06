import { TestBed } from '@angular/core/testing';

import { AuthReturnLoginGuard } from './auth-rerturn-login.guard';

describe('AuthRerturnLoginGuard', () => {
  let guard: AuthReturnLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthReturnLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
