import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValueProps } from '../../interfaces/input-value-props';

import Swal from 'sweetalert2';

//Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

//Enum
import { LocalStorageEnum } from '../../enums/local-storage.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
    return JSON.parse(localStorage.getItem(LocalStorageEnum.MY_LIST) || '[]');
  }

  private updateLocalStorage() {
    return localStorage.setItem(
      LocalStorageEnum.MY_LIST,
      JSON.stringify(this.getListItems())
    );
  }

  getInputAndAddItem(value: InputValueProps) {
    const currentItems = this.parseItems();
    currentItems.push(value);
    localStorage.setItem(
      LocalStorageEnum.MY_LIST,
      JSON.stringify(currentItems)
    );
    this.setListItems.set(currentItems);
  }

  listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: InputValueProps) => {
      if (value === 'pending') {
        return !res.checked;
      }

      if (value === 'completed') {
        return res.checked;
      }

      return res;
    });
  }

  updateItemCheckbox(newItem: { checked: boolean; id: string }) {
    this.setListItems.update((oldValue: InputValueProps[]) => {
      return oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.checked = newItem.checked;
          return item;
        }
        return oldValue;
      });
    });

    return this.updateLocalStorage();
  }

  updateItemText(newItem: { value: string; id: string }) {
    this.setListItems.update((oldValue: InputValueProps[]) => {
      return oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.value = newItem.value;
          return item;
        }
        return oldValue;
      });
    });

    return this.updateLocalStorage();
  }
  deleteItem(id: string) {
    this.setListItems.update((oldValue: InputValueProps[]) => {
      return oldValue.filter((res) => res.id !== id);
    });

    return this.updateLocalStorage();
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(LocalStorageEnum.MY_LIST);
        return this.setListItems.set(this.parseItems());
      }
    });
  }
}
