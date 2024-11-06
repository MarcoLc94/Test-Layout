import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appKeyboardShortcut]',
  standalone: true,
})
export class KeyboardShortcutDirective {
  @Input('KeyboardShortcut') keyCombination!: string; // combinacion de teclas
  @Input() shortcutAction!: () => void; // metodo

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const pressedKeys: string[] = [];
    if (event.ctrlKey) pressedKeys.push('ctrl');
    if (event.altKey) pressedKeys.push('alt');
    if (event.shiftKey) pressedKeys.push('shift');
    if (event.metaKey) pressedKeys.push('meta'); // Para "command" en Mac
    pressedKeys.push(event.key.toLowerCase());

    const pressedCombination = pressedKeys.join('+'); // la convinacion de teclas ingresada por el usuario se transforma en un string

    // Se compara la combinacion de teclas de la directiva con la que el usuario ingreso, si coinciden se ejecuta el metodo enviado por la directiva
    if (this.keyCombination === pressedCombination) {
      event.preventDefault();
      if (this.shortcutAction) {
        this.shortcutAction();
      }
    }
  }


}
