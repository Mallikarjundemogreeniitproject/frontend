import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
  
});
