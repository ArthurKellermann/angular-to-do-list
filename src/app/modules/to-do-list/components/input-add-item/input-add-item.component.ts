import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { InputValueProps } from '../../interfaces/input-value-props';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.scss']
})
export class InputAddItemComponent {
  @ViewChild('inputText') inputText!: ElementRef;
  @Output() outputListItems = new EventEmitter<InputValueProps>();

  focusAndAddItem(value: string) {
    if (value) {
      const inputValue: InputValueProps = {
        id: uuidv4() as string,
        checked: false,
        value,
        createdAt: new Date()
      };

      this.inputText.nativeElement.value = '';
      this.outputListItems.emit(inputValue);
      this.inputText.nativeElement.focus();
    }
  }
}
