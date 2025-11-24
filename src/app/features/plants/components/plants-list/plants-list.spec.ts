import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsList } from './plants-list';

describe('PlantsList', () => {
  let component: PlantsList;
  let fixture: ComponentFixture<PlantsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
