import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyboardShortcutDirective } from '../../../directives/KeyboardShortcut.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule, KeyboardShortcutDirective
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  constructor(){}



  btnCtrlD(){
    alert("Botón Ctrl+d con directiva")
  }

}
