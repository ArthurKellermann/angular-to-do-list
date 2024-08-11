import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputValueProps } from '../../interfaces/input-value-props';

interface OutputUpdateItemCheckboxProps {
  checked: boolean,
  id: string
}

interface OutputUpdateItemTextProps {
  value: string,
  id: string
}
@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({ required: true }) inputListItems: InputValueProps[] = [];

  @Output() outputUpdateItemCheckbox = new EventEmitter<OutputUpdateItemCheckboxProps>();
  updateItemCheckbox({ checked, id }: OutputUpdateItemCheckboxProps) {
    this.outputUpdateItemCheckbox.emit({ checked, id });
  }

  @Output() outputUpdateItemText = new EventEmitter<OutputUpdateItemTextProps>();
  updateItemText({ value, id }: OutputUpdateItemTextProps) {
    this.outputUpdateItemText.emit({ value, id });
  }

  @Output() outputDeleteItemText = new EventEmitter<string>();
  deleteItem(id: string) {
    this.outputDeleteItemText.emit(id);
  }

}
