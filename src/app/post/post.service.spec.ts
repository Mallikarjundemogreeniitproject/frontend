import { HttpClient } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { IndexComponent } from './index/index.component';
import { PostService } from './post.service';

describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
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

 /*
  it('should return expected posts when getAll is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
     console.log("sssss");
      postService.getAll().subscribe({
        next: (posts) => {
          console.log(posts);
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_getAll = spyOn(component,"refreshData").and.returnValue([]);
    component.ngOnInit();
    expect(component.posts).toEqual([]);
  });
  */

});