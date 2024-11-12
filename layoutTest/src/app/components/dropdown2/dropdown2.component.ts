import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DropdownOption {
  value: any;
  label: string;
}

@Component({
  standalone: true,
  selector: 'app-dropdown2',
  template: `
    <ng-select
      #ngSelect
      [items]="options"
      [clearable]="false"
      bindLabel="label"
      bindValue="value"
      [placeholder]="placeholder"
      [(ngModel)]="selectedValue"
      (change)="onChangeSelection($event)"
      (keydown)="handleKeyDown($event)"
      [tabIndex]="0"
      [openOnEnter]="true"
      [loading]="false"
      [markFirst]="true"
    >
    </ng-select>
  `,
  styles: [`
    ::ng-deep .ng-select.ng-select-focused:not(.ng-select-opened) > .ng-select-container {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
    }
    ::ng-deep .ng-select .ng-select-container {
      min-height: 36px;
    }
    ::ng-deep .ng-dropdown-panel {
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    ::ng-deep .ng-option {
      padding: 8px 12px;
    }
    ::ng-deep .ng-option.ng-option-selected {
      background-color: #007bff;
      color: white;
    }
    ::ng-deep .ng-option.ng-option-marked {
      background-color: #e6f3ff;
      color: #333;
    }
  `],
  imports: [CommonModule, NgSelectModule, FormsModule],
})
export class DropdownComponent2 {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() initialValue?: any;
  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('ngSelect') ngSelect!: NgSelectComponent;

  selectedValue: any;
  currentIndex: number = -1;

  ngOnInit() {
    if (this.initialValue) {
      this.selectedValue = this.initialValue;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.ngSelect.isOpen) {
          this.ngSelect.open();
          this.currentIndex = 0;
        } else {
          this.currentIndex = Math.min(this.currentIndex + 1, this.options.length - 1);
          this.highlightOption(this.currentIndex);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.ngSelect.isOpen) {
          this.currentIndex = Math.max(this.currentIndex - 1, 0);
          this.highlightOption(this.currentIndex);
        }
        break;

      case 'Enter':
        if (this.ngSelect.isOpen && this.currentIndex >= 0) {
          event.preventDefault();
          this.selectCurrentOption();
        }
        break;

      case 'Tab':
        if (this.ngSelect.isOpen) {
          this.ngSelect.close();
          this.currentIndex = -1;
        }
        break;

      case 'Escape':
        if (this.ngSelect.isOpen) {
          this.ngSelect.close();
          this.currentIndex = -1;
        }
        break;
    }
  }

  highlightOption(index: number) {
    // Asegúrate de que el índice es válido
    if (index >= 0 && index < this.options.length) {
      const itemsList = this.ngSelect.itemsList;
      if (itemsList) {
        itemsList.markItem(itemsList.items[index]);
      }
    }
  }

  selectCurrentOption() {
    if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
      this.selectedValue = this.options[this.currentIndex].value;
      this.onChangeSelection(this.options[this.currentIndex]);
      this.ngSelect.close();
      this.currentIndex = -1;
    }
  }

  onChangeSelection(event: any) {
    this.selectionChange.emit(event);
  }
}
