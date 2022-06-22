import { ComponentFixture, inject, TestBed,async, fakeAsync, tick } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
 import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpMock : HttpClientTestingModule;
  let httpController: HttpTestingController;
  let service: PostService;
	let url = 'localhost:8000/';


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [ HttpClientTestingModule,HttpClientModule,FormsModule,MatDialogModule, MatButtonModule,MatIconModule], 
      providers: [ PostService, { provide: MatDialog, useValue: {}, },
        { provide: MatDialogRef, useValue: {} },
      	{ provide: MAT_DIALOG_DATA, useValue: [] },
        CreateComponent,EditComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostService);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call getAll and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(PostService);
    let spy_getAll = spyOn(service,"getAll").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.refreshData();
    tick(100);
    expect(component.postDetails).toEqual([]);
  })); 

  it('should be created Service', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

  const expectedHeroes: Post[] =[{"id":1,"name":"Mallikarjun H","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"},{"id":2,"name":"Mallikarjun","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"}];
  it('should return value from observable',
      (done: DoneFn) => {
      service.getAll().subscribe(value => {
        console.log(value);
        expect(value).toEqual(expectedHeroes);
        done();
      });
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
    });
  });
    
});


