import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let fixture: ComponentFixture<IndexComponent>;
  let component : IndexComponent; 
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [FormsModule],
      declarations: [IndexComponent]
    });
    service = TestBed.inject(PostService);
  });

  it("should create a post in an array", () => {
    const qouteText = "This is my first post";
    service.create(qouteText);
    expect(service.getAll.length).toBeGreaterThanOrEqual(1);
  });

  it("should remove a created post from the array of posts", () => {
    service.create("This is my first post");
    service.delete(0);
    expect(service.getAll.length).toBeLessThan(1);
  });

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  it("should use the postsList from the service", () => {
    const postService = fixture.debugElement.injector.get(PostService);
    fixture.detectChanges();
    expect(postService.getAll()).toBeTruthy(); // toContain(component.posts);
  });

  
});
