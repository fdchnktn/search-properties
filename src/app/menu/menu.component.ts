import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  language = new FormControl();

  languages: SelectItem[] = [
    {label: 'English', value: 'en'},
    {label: 'Germany', value: 'de'},
    {label: 'Spain', value: 'es'}
  ];

  items: MenuItem[] = [
    {label: 'Home', routerLink: ['/home']},
    {label: 'Property', routerLink: ['/property']},
    {label: 'Favourites', routerLink: ['/favourites']}
  ];
}
