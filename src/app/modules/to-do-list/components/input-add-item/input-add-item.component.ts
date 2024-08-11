import { Component, ElementRef, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { InputValueProps } from '../../interfaces/input-value-props';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.scss']
})
export class InputAddItemComponent {
  @ViewChild('inputText') inputText!: ElementRef;

  @Input({ required: true}) inputListItems: InputValueProps[] = [];
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
