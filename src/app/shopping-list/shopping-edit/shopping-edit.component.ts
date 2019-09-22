import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ShoppingItem } from '../../shared/shopping.model';
import { ShoppingListService } from './../shopping-list-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: ShoppingItem;

  constructor(private slService: ShoppingListService ) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getBasketitem(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            qty: this.editedItem.qty,
            price: this.editedItem.price,
            cpc: this.editedItem.cpc,
            imported: this.editedItem.imported
          });
        }
      );
  }

  onSumit(form: NgForm) {
    const value = form.value;
    const newBasketitem: ShoppingItem = new ShoppingItem(value.name, value.qty, value.price, value.cpc, value.imported);
    if (this.editMode) {
      this.slService.updateBasketitem(this.editedItemIndex, newBasketitem);
    } else {
      this.slService.addBasketitem(newBasketitem);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteBasketitem(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
