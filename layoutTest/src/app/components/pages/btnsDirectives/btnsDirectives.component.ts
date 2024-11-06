import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { KeyboardShortcutDirective } from '../../../directives/KeyboardShortcut.directive';

@Component({
  selector: 'app-btns-directives',
  standalone: true,
  imports: [
    CommonModule, KeyboardShortcutDirective
  ],
  templateUrl: './btnsDirectives.component.html',
  styleUrl: './btnsDirectives.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnsDirectivesComponent {
  @ViewChild('btnctrla', {static:true}) btnCtrla!: ElementRef;
  @ViewChild('btnctrlb', {static:true}) btnCtrlb!: ElementRef;


  btnCtrlD(){
    console.log("boton 1")
    alert("Botón Ctrl+d con directiva")
  }

  btnCtrlAltC(){
    alert("Botón Ctrl+alt+c con directiva")
    console.log("boton 2")
  }

  btnCtrlA(){
    alert("Botón btnCtrlA")
    console.log("Botón btnCtrlA")
  }

  btnCtrlB(){
    alert("Botón btnCtrlB")
    console.log("Botón btnCtrlB")
  }

  /*Combinacion de teclas sin directivas*/
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.ctrlKey && event.key === "a") {
      event.preventDefault();
      this.btnCtrla.nativeElement.click();

    } else if(event.ctrlKey && event.key === "b"){
      event.preventDefault();
      this.btnCtrlb.nativeElement.click();
    }
  }
}
