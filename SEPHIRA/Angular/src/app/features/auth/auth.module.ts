import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { OtpDialogComponent } from './components/otp-dialog/otp-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetComponent } from './pages/reset/reset.component';


@NgModule({
	declarations: [
		AuthComponent,
		OtpDialogComponent,
  RedirectComponent,
  ResetComponent
	],
	imports: [
		CommonModule,
		AuthRoutingModule,

		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatSnackBarModule
	],
	exports: [
		AuthComponent
	]
})
export class AuthModule { }
