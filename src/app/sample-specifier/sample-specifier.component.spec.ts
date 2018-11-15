import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSpecifierComponent } from './sample-specifier.component';

describe('SampleSpecifierComponent', () => {
  let component: SampleSpecifierComponent;
  let fixture: ComponentFixture<SampleSpecifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleSpecifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSpecifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
