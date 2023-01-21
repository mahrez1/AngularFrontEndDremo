import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCaregoryMenuComponent } from './product-caregory-menu.component';

describe('ProductCaregoryMenuComponent', () => {
  let component: ProductCaregoryMenuComponent;
  let fixture: ComponentFixture<ProductCaregoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCaregoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCaregoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
