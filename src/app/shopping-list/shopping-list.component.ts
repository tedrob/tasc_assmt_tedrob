import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingItem } from './../shared/shopping.model';
import { Subscription, from } from 'rxjs';
import { ShoppingListService } from './shopping-list-service';
import { CasherItem } from './../shared/cashieritem.model';
import { Cashier } from './../shared/cashier.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  basketitems: ShoppingItem[] = [];
  private subscription: Subscription;
  private salesprice: number;
  totalsalesprice: number;
  private salestax: number;
  totalsalesTax: number;
  cashiersform: any[] = [];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.basketitems = this.slService.getBasketitems();
    this.subscription = this.slService.basketitemsChanged
      .subscribe(
        (basketitems: ShoppingItem[]) => {
          this.basketitems = basketitems;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  onCalculate() {
    this.cashiersform = [];
    console.log('\tOutput:');
    this.cashiersform.push('Output:');
    const items: ShoppingItem[] = this.slService.getBasketitems();
    if (items.length === 0 ) {
      return;
    }
    let total = 0;
    let totaltax = 0;

    for (const item of items) {
      this.calculateSales(item);
      const itemsDisplay = `${item.qty} ${item.name} ${parseFloat(this.salesprice.toString()).toFixed(2)}`;
      total += (this.salesprice);
      if ((this.salestax === 0 || this.salestax !== undefined)) {
        totaltax += (this.salestax);
      }

      this.salestax = this.salesprice - parseFloat(item.price);
      console.log('\t\t' + itemsDisplay);
      this.totalsalesTax += this.salesprice - this.salestax;
      this.totalsalesprice += this.salesprice;
      this.cashiersform.push(itemsDisplay);
    }
    console.log('\t\tSales Taxes ' + parseFloat(totaltax.toString()).toFixed(2));
    this.cashiersform.push('\t\tSales Taxes ' + parseFloat(totaltax.toString()).toFixed(2));

    console.log('\t\tTotal  ' + parseFloat(total.toString()).toFixed(2));
    this.cashiersform.push('\t\tTotal  ' + parseFloat(total.toString()).toFixed(2));

    this.totalsalesTax = 0.00;
    this.totalsalesprice = 0.00;
  }

  calculateSales(shoppingItem: ShoppingItem) {
    let saleprice = 0.00;
    let totaltax = 0.00;
    const price = parseFloat(shoppingItem.price);

    if (shoppingItem.cpc !== true && shoppingItem.imported !== true) {
      saleprice = (price * 1.10);
    }
    if (shoppingItem.cpc === true && shoppingItem.imported !== true) {
      saleprice = price;
    }
    if (shoppingItem.cpc !== true && shoppingItem.imported === true) {
      saleprice = (price * 1.15);
    }
    if (shoppingItem.cpc === true && shoppingItem.imported === true) {
      saleprice = (price * 1.05);
    }

    totaltax = Math.round(saleprice - price) * 100 / 100;
    saleprice = Math.round(saleprice * 100) / 100;

    this.salesprice = saleprice;
    this.salestax = (saleprice - price);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
