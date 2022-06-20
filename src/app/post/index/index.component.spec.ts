import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { PostService } from '../post.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpMock : HttpClientTestingModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent,MatDialog ],
      imports: [ HttpClientTestingModule,HttpClientModule,HttpTestingController ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
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

