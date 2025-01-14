import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CoreService } from 'src/app/core/services/core/core.service';
import { CartItem } from 'src/app/models/cart-item';
import { AddressForm, Order } from 'src/app/models/order';
import { Coupon } from 'src/app/models/posts/coupon';
import { ShippingZone } from 'src/app/models/shipping-zone';
import { TaxRate } from 'src/app/models/tax-rate';
import { environment } from 'src/environments/environment';

export interface CoinbaseRes {
	expires_at: string | Date;
	hosted_url: string;
}

export interface NowPaymentRes {
	pay_addresss?: string;
	pay_amount?: number;
	pay_currency?: string;
	invoice_url?: string;
	created_at: Date;
}

export interface NowPaymentCoin {
	coin: string;
	ext?: string;
}

export interface NowPaymentsMinAmountRes {
	min_amount: number;
	fiat_equivalent: number;
}

@Injectable({
	providedIn: 'root',
})
export class CheckoutService {

	private readonly orderBase = environment.apiServer + 'order/';
	private readonly paymentBase = environment.apiServer + 'payment/';
	private readonly shippingBase = environment.apiServer + 'shipping/';
	private readonly taxBase = environment.apiServer + 'tax/';
	private readonly requiredLoggedIn = environment.requireLoggedInToCheckout;

	constructor(private http: HttpClient, private core: CoreService) { }

	public createOrder(items: CartItem[], gateway: string): Observable<string> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<string>(this.orderBase + 'orders', { items, gateway }, { headers });
	}

	public editOrder(id: string, items?: CartItem[], addresses?: AddressForm, coupons?: Coupon[]): Observable<string> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		let payload: any = {};
		if (items) {
			payload['items'] = items;
		}
		if (addresses) {
			payload['addresses'] = addresses;
		}
		if (coupons) {
			payload['coupons'] = coupons;
		}
		return this.http.put<string>(this.orderBase + 'order/' + id, payload, { headers });
	}

	public getOrder(id: string): Observable<Order> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.get<Order>(this.orderBase + 'order/' + id, { headers });
	}

	public getShippingZone(country: string, state: string): Observable<ShippingZone> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		const params = new HttpParams().append('state', state.toUpperCase());
		return this.http.get<ShippingZone>(this.shippingBase + country.toLowerCase(), { params, headers });
	}

	public getTaxRate(country: string, zip: string): Observable<TaxRate> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		const params = new HttpParams().append('zip', zip);
		return this.http.get<TaxRate>(this.taxBase + country.toLowerCase(), { params, headers });
	}

	// Stripe

	public stripeCheckout(paymentMethodID: string, email: string, addresses: AddressForm, orderID: string): Observable<string> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<string>(this.paymentBase + 'stripe/checkout', { paymentMethodID, email, addresses, orderID }, { headers });
	}

	// PayPal

	public paypalCheckout(orderID: string, location: string): Observable<any> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<any>(this.paymentBase + 'paypal/checkout', { orderID, location }, { headers });
	}

	public paypalCapture(orderID: string): Observable<any> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<any>(this.paymentBase + 'paypal/capture', { orderID }, { headers });
	}

	// Coinbase

	public getCoinbaseCommerceRes(orderID: string, location: string): Observable<CoinbaseRes> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<CoinbaseRes>(this.paymentBase + 'coinbase/checkout', { orderID, location }, { headers })
	}

	// NOWPayments	

	public getNowPaymentsCoins(): Observable<NowPaymentCoin[]> {
		return this.http.get<NowPaymentCoin[]>(this.paymentBase + 'nowpayments/available-coins');
	}

	public getNowPaymentsEstimatedAmount(coin: string, amount: number): Observable<number> {
		const params = new HttpParams().append('coin', coin).append('amount', amount);
		return this.http.get<number>(this.paymentBase + 'nowpayments/estimated-amount', { params })
	}

	public getNowPaymentsMinAmount(coin: string): Observable<NowPaymentsMinAmountRes> {
		const params = new HttpParams().append('coin', coin);
		return this.http.get<NowPaymentsMinAmountRes>(this.paymentBase + 'nowpayments/min-amount', { params })
	}

	public nowPaymentsPaymentCheckout(orderID: string, coin: string): Observable<NowPaymentRes> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<NowPaymentRes>(this.paymentBase + 'nowpayments/payment-checkout', { orderID, coin }, { headers })
	}

	public nowPaymentsInvoiceCheckout(orderID: string, coin: string, location: string): Observable<NowPaymentRes> {
		let headers = this.core.createAuthHeader();
		if (!headers) {
			if (this.requiredLoggedIn) {
				return EMPTY;
			}
			headers = new HttpHeaders();
		}
		return this.http.post<NowPaymentRes>(this.paymentBase + 'nowpayments/invoice-checkout', { orderID, coin, location }, { headers })
	}

}
