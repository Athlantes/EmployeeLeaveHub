import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeam } from './manage-team';

describe('ManageTeam', () => {
  let component: ManageTeam;
  let fixture: ComponentFixture<ManageTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
