import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { CreateComponent } from './create.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientModule,HttpClientTestingModule,RouterTestingModule,MatDialogModule,MatStepperModule, MatButtonModule, MatIconModule],
      declarations: [ CreateComponent ],
      providers: [ PostService,{ provide: MatDialog,MatDialogRef, useValue: {}, } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the create app', () => {
    const fixture = TestBed.createComponent(CreateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be created Service', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
      });
  });

});


