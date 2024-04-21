import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsUsersComponent } from './actions-users.component';

describe('ActionsUsersComponent', () => {
  let component: ActionsUsersComponent;
  let fixture: ComponentFixture<ActionsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
