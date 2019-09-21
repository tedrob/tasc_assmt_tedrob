import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ShoppingItem } from '../../shared/shopping.model';
import { ShoppingListService } from './../shopping-list-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
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
            qty: this.editedItem.qty
          });
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newBasketiem: ShoppingItem = new ShoppingItem(value.name, value.qty, value.price, value.cpc, value.imported);
    this.slService.addBasketitem(newBasketiem);
    }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteBasketitem(this.editedItemIndex);
    this.onClear();
  }
}
