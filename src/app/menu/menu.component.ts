import {Component } from '@angular/core';
import { items } from '../app-const/app-const.menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public items = items;
}
