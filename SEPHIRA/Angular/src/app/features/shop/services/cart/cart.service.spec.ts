import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreService } from 'src/app/core/services/core/core.service';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';

import { CartService } from './cart.service';

describe('CartService', () => {
	let service: CartService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, RouterTestingModule, BrowserTransferStateModule],
			providers: [AuthService, PlatformService, CoreService]
		});
		service = TestBed.inject(CartService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
