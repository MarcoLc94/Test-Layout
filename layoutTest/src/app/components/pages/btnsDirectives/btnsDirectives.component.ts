import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { KeyboardShortcutDirective } from '../../../directives/KeyboardShortcut.directive';
import { ButtonComponent } from '../../custom/button/button.component';
import { TapindexDirective } from '../../../directives/Tapindex.directive';
import { TabControlService } from '../../../services/TabControl.service';

@Component({
  selector: 'app-btns-directives',
  standalone: true,
  imports: [
    CommonModule, KeyboardShortcutDirective, ButtonComponent, TapindexDirective
  ],
  templateUrl: './btnsDirectives.component.html',
  styleUrl: './btnsDirectives.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnsDirectivesComponent {
  @ViewChild('btnctrla', {static:true}) btnCtrla!: ElementRef;
  @ViewChild('btnctrlb', {static:true}) btnCtrlb!: ElementRef;

  constructor(private tabControlService: TabControlService){}

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
      this.btnCtrla.nativeElement.click();

    } else if(event.ctrlKey && event.key === "b"){
      event.preventDefault();
      this.btnCtrlb.nativeElement.click();
    }

    // Capturar el tab para enfocar un elemento mediante una directiva
    if(event.key === "Tab"){
      this.tabControlService.emitTab(event);
    }
  }

  onContentFocus(){
    this.tabControlService.resetIndex();
  }
}
