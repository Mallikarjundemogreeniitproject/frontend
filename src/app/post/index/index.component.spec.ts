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
import { AgGridModule } from 'ag-grid-angular';

const expectedHeroes: Post[] =[{"id":1,"name":"Mallikarjun H","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"},{"id":2,"name":"Mallikarjun","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"}];


describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpMock : HttpClientTestingModule;
  let httpController: HttpTestingController;
  let service: PostService;
	let url = 'http://localhost:8000/';


  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [FormsModule, HttpClientTestingModule,HttpClientModule,FormsModule,MatDialogModule, MatButtonModule,MatIconModule,
        AgGridModule.withComponents([CreateComponent])], 
      providers: [ PostService, { provide: MatDialog, useValue: [], },
        { provide: MatDialogRef, useValue:{} },
      	{ provide: MAT_DIALOG_DATA, useValue: [expectedHeroes] },
        CreateComponent,EditComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();


    service = TestBed.get(PostService);
    httpController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
    
  // it('should be Create orders Service',() => {
  //   const postsData : any = [{"id":1,"name":"Mallikarjun H","state":"KA","zip":"585101","amount":"100","qty":"12","item":"It123"}];
  //   service.create(postsData).subscribe(posts=>{
  //     expect(postsData.length).toBe(2);
  //     expect(posts).toEqual(postsData);
  //   });

  //   const request = httpController.expectOne(url+'api/orders/');
  //   expect(request.request.method).toBe('POST');
  //   request.flush(postsData);

  // });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the debug app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

 
  // it('should return Create dialog model',(done: DoneFn) => {
  //    let matDialogService: jasmine.SpyObj<MatDialog>;
  //    matDialogService = jasmine.createSpyObj<MatDialog>('IndexComponent', ['open']);
  // });


  // it('should return value from observable',
  //     (done: DoneFn) => {
  //     service.getAll().subscribe(value => {
  //       console.log(value);
  //       expect(value).toEqual(expectedHeroes);
  //       done();
  //     });
  // });

  // it('should return delete value from observable',
  //     (done: DoneFn) => {
  //     service.delete('1').subscribe(value => {
  //       console.log(value);
  //       expect(value).toBeFalse();
  //       done();
  //     });
  // });

    it('should have expected ag-grid column headers', () => {
        component.posts = expectedHeroes;
        fixture.detectChanges();

        const elm = fixture.nativeElement;
        const grid = elm.querySelector('ag-grid-angular');
        const headerCells = grid.querySelectorAll('.ag-header-cell-text');
        const headerTitles = Array.from(headerCells).map((cell: any) =>
            cell.textContent.trim()
        );
        expect(headerTitles).toEqual(['Id', 'Name','State','ZipCode','Amount','Qty','Item Number']);
    });

    it('should have the value of ag grid cells in IndexComponent', () => {
        // Setup template bindings and run ngOInit. This causes the <ag-grid-angular> component to be created.
        // As part of the creation the grid apis will be attached to the gridOptions property.
        fixture.detectChanges();

        const appElement = fixture.nativeElement;
        const cellElements = appElement.querySelectorAll('.ag-cell-value');
        expect(cellElements.length).toEqual(0);
        // expect(cellElements[0].textContent).toEqual("Test Name");
        // expect(cellElements[1].textContent).toEqual("42");
        // expect(cellElements[2].textContent).toEqual("84");
    });
    
 

});


