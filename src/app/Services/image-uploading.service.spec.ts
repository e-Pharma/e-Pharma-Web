import { TestBed } from '@angular/core/testing';

import { ImageUploadingService } from './image-uploading.service';

describe('ImageUploadingService', () => {
  let service: ImageUploadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUploadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
