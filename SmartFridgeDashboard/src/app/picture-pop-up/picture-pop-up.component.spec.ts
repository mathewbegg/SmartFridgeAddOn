import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePopUpComponent } from './picture-pop-up.component';

describe('PicturePopUpComponent', () => {
  let component: PicturePopUpComponent;
  let fixture: ComponentFixture<PicturePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
