import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingItem } from '../shared/shopping.model';
import { CasherItem } from './../shared/cashieritem.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  basketitemsChanged = new Subject<ShoppingItem[]>();
  startedEditing = new Subject<number>();
  private basketitems: ShoppingItem[] = [
    new ShoppingItem('16lb bag of Skittles', 1, '16.00', true, false)
  ];
  private cashieritems: CasherItem[] = [];
  cashieritemsChanged = new Subject<CasherItem[]>();

  getBasketitems() {
    return this.basketitems.slice();
  }

  getBasketitem(index: number) {
    return this.basketitems[index];
  }

  addBasketitem(basketitem: ShoppingItem) {
    this.basketitems.push(basketitem);
    this.basketitemsChanged.next(this.basketitems.slice());
  }

  addBasketitems(basketitems: ShoppingItem[]) {
    this.basketitems.push(...basketitems);
    this.basketitemsChanged.next(this.basketitems.slice());
  }

  updateBasketitem(index: number, newBasketitem: ShoppingItem) {
    this.basketitems[index] = newBasketitem;
    this.basketitemsChanged.next(this.basketitems.slice());
  }

  deleteBasketitem(index: number) {
    this.basketitems.splice(index, 1);
    this.basketitemsChanged.next(this.basketitems.slice());
  }
  addCashieritems(cashieritems: CasherItem[]) {
    this.cashieritems.push(...cashieritems);
    this.cashieritemsChanged.next(this.cashieritems.slice());
  }
  addCashieritem(cashieritem: CasherItem) {
    this.cashieritems.push(cashieritem);
    this.cashieritemsChanged.next(this.cashieritems.slice());
  }
}
