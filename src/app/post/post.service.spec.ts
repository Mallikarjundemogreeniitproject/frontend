import { HttpClient } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { IndexComponent } from './index/index.component';
import { PostService } from './post.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';


describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let httpSpy: Spy<HttpClient>;

  let POSTS = [
     {
            "id": 1,
            "name": "Mallikarjun H",
            "state": "KA",
            "zip": "585101",
            "amount": "100",
            "qty": "12",
            "item": "It123"
        },
        {
            "id": 2,
            "name": "Mallikarjun",
            "state": "KA",
            "zip": "585101",
            "amount": "100",
            "qty": "12",
            "item": "It123"
        }
  ];
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['GET']);
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: httpClientSpyObj}
      ],
    });
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  
 it('should be created Service', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

 
});