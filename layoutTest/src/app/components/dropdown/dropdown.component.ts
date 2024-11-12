import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DropdownOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  template: `
    <div 
      class="custom-dropdown" 
      [class.open]="isOpen"
      (keydown)="handleKeyDown($event)"
      (focus)="onFocus()"
      tabindex="0" 
      #dropdownElement
    >
      <div 
        class="dropdown-header" 
        (click)="toggleDropdown()"
      >
        <span>{{ selectedOption?.label || placeholder }}</span>
        <i class="arrow" [class.up]="isOpen"></i>
      </div>
      
      <div class="dropdown-options">
  @if (isOpen) {
    @for (option of options; track option.value; let i = $index) {
      <div
        class="option"
        [class.selected]="i === highlightedIndex"
        (click)="selectOption(option)"
        (mouseover)="highlightedIndex = i"
      >
        {{ option.label }}
      </div>
    }
  }
</div>

  `,
  styles: [`
    .custom-dropdown {
      position: relative;
      /* ...otros estilos... */
    }

    .dropdown-options {
      position: absolute;
      list-style: none;
      margin: 0;
      padding: 0;
      z-index: 1000;
      /* Otros estilos para mostrar desplegable correctamente */
    }

    .option.selected {
      background-color: #e8f0fe;  /* Actualiza el color según necesites */
    }
    
    .option {
      padding: 5px 10px;
      cursor: pointer;
    }
    
    .option:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class DropdownComponent {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() initialValue?: any;
  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('dropdownElement') dropdownElement!: ElementRef;

  isOpen = false;
  selectedOption?: DropdownOption;
  highlightedIndex = -1;

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.highlightedIndex = 0;
        } else {
          this.highlightedIndex = (this.highlightedIndex + 1) % this.options.length;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightedIndex = (this.highlightedIndex - 1 + this.options.length) % this.options.length;
        }
        break;

      case 'Enter':
      case ' ': // Espacio
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else if (this.highlightedIndex >= 0) {
          this.selectOption(this.options[this.highlightedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        this.highlightedIndex = -1;
        break;

      case 'Tab':
        if (this.isOpen) {
          this.isOpen = false;
          this.highlightedIndex = -1; 
          event.preventDefault();  
          const nextFocusable = this.findNextFocusable();
          if (nextFocusable) {
            (nextFocusable as HTMLElement).focus();
          }
        }
        break;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex = -1;
    }
  }

  selectOption(option: DropdownOption) {
    this.selectedOption = option;
    this.selectionChange.emit(option.value);
    this.isOpen = false;
    this.highlightedIndex = -1;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = (event.target as HTMLElement).closest('.custom-dropdown');
    if (!dropdownElement) {
      this.isOpen = false;
      this.highlightedIndex = -1;
    }
  }

  onFocus() {
    this.dropdownElement.nativeElement.focus();
  }

  findNextFocusable() {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    const currentIndex = Array.prototype.indexOf.call(focusableElements, document.activeElement);
    return focusableElements[currentIndex + 1];
  }
}
