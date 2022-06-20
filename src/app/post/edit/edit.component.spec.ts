import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //This is test suite
  it("test spec", function() {
     expect( expression ).toEqual(true);
  }); 
 
});
function expression(expression: any) {
  throw new Error('Function not implemented.');
}

