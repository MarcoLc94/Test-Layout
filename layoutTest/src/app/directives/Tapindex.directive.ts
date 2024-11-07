import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { TabControlService } from '../services/TabControl.service';

@Directive({
  selector: '[appTapindex]',
  standalone: true,
})
export class TapindexDirective implements OnInit{

  @Input() tabIndex!: string;

  constructor(private tabControlService: TabControlService, private el: ElementRef) {}

  ngOnInit(): void {
    this.tabControlService.message$.subscribe(({event, index}) => {
      // Verifica si el index del componente es igual al index que se envia del componente padre
      if(this.tabIndex === index.toString()){
        // Si es igual, entonces a este elemento toma el focus
        event.preventDefault();
        this.el.nativeElement.focus();
        this.tabControlService.setNextIndex();
      }
    });
  }

  @HostListener('click') onClick() {
    this.tabControlService.setIndex(parseInt(this.tabIndex)+1); // le da el focus al siguiente elemento
  }

}
