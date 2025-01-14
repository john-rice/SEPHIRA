import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
	selector: 'sephira-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
	
	@Input() menuItems: MenuItem[];
	@Input() horizontal: boolean;
	@Input() isAdmin: boolean;

	constructor() {
		this.menuItems = [];
		this.horizontal = false;
		this.isAdmin = false;
	}

}
