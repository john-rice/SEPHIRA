import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CoreService } from '../core/core.service';

import { PostService } from './post.service';

describe('PostService', () => {
	let service: PostService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [CoreService],
		});
		service = TestBed.inject(PostService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
