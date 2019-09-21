import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from './../shared/shopping.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  basketitems: ShoppingItem[] = [
    new ShoppingItem('16lb bag of Skittles', 1, '16.00', true, false),
    new ShoppingItem('16lb bag of Skittles', 1, '16.00', true, false)
  ];

  constructor() { }

  ngOnInit() {
  }

}
