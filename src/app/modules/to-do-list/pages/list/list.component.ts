import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { CommonModule } from '@angular/common';
import { InputValueProps } from '../../interfaces/input-value-props';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  addItem: boolean = true;

  toggleAddItem() {
    this.addItem = !this.addItem;
  }

  private setListItems = signal<InputValueProps[]>([this.#parseItems()]);

  get listItems() {
    return this.setListItems.asReadonly();
  }

  #parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  getInputAndAddItem(value: InputValueProps) {
    localStorage.setItem('@my-list', JSON.stringify([value]));
  }
}
