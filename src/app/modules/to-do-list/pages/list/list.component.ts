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

  setListItems = signal<InputValueProps[]>(this.parseItems());

  toggleAddItem() {
    this.addItem = !this.addItem;
  }

  getListItems() {
    return this.setListItems();
  }

  private parseItems(): InputValueProps[] {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  getInputAndAddItem(value: InputValueProps) {
    const currentItems = this.parseItems();
    currentItems.push(value);
    localStorage.setItem('@my-list', JSON.stringify(currentItems));
    this.setListItems.set(currentItems);
  }

  deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.setListItems.set(this.parseItems());
  }
}
