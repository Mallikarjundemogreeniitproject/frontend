import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from '../post';
import { PostService } from '../post.service';

import { EditComponent } from './edit.component';

const expectedHeroes: Post[] =[{"id":1,"name":"Mallikarjun H","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"}];
describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let httpMock : HttpClientTestingModule;
  let httpController: HttpTestingController;
  let service: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [FormsModule,HttpClientModule,HttpClientTestingModule,RouterTestingModule,MatDialogModule,
        MatIconModule,ReactiveFormsModule],
       providers: [ PostService, { provide: MatDialog, useValue: [], },
        { provide: MatDialogRef, useValue:{} },
      	{ provide: MAT_DIALOG_DATA, useValue: [] }]
    })
    .compileComponents();

    service = TestBed.inject(PostService);
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    component.post = {
        id:1,
        name: 'One component',
        state: 'Caption',
        zip: 'TextareaComponent',
        amount: '2000',
        qty : '1',
        item : '11111'
    };
    // fixture.detectChanges();
    httpController = TestBed.inject(HttpTestingController);
  });

  //  it('should create the app EditComponent', () => {
  //   const fixture = TestBed.createComponent(EditComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  it('should have expected Edit Dialog model Title', () => {
        const appElement = fixture.nativeElement;
        const cellElements = appElement.querySelectorAll('.modal-title');
        expect(cellElements[0].textContent).toEqual('Update Post');
  });

  // it('should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //     });
  // });

});

