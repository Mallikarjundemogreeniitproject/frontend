import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { CreateComponent } from './create.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientModule,HttpClientTestingModule,RouterTestingModule,MatDialogModule,
        MatStepperModule, MatButtonModule, MatIconModule,ReactiveFormsModule],
      declarations: [ CreateComponent ],
       providers: [ PostService, { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue:{} },
      	{ provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the create app CreateComponent', () => {
    const fixture = TestBed.createComponent(CreateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

   it('should have expected Create Dialog model Title', () => {
        const appElement = fixture.nativeElement;
        const cellElements = appElement.querySelectorAll('.modal-title');
        expect(cellElements[0].textContent).toEqual('Create New Post');
  });

});


