import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';


describe('AppComponent', () => {
    const routes: Routes = [
      { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
      { path: 'post/index', component: IndexComponent },
      { path: 'post/:postId/view', component: ViewComponent },
      { path: 'post/create', component: CreateComponent },
      { path: 'post/:postId/edit', component: EditComponent } 
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        IndexComponent,
        ViewComponent,
        CreateComponent,
        EditComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GreenIT Application Challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GreenIT Application Challenge');
  });

});
