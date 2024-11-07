import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { TapindexDirective } from '../../../directives/Tapindex.directive';
import { TabControlService } from '../../../services/TabControl.service';
import { ButtonComponent } from '../../custom/button/button.component';

@Component({
  selector: 'app-test-tab-directiva',
  standalone: true,
  imports: [
    CommonModule, TapindexDirective, ButtonComponent
  ],
  templateUrl: './TestTabDirectiva.component.html',
  styleUrl: './TestTabDirectiva.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTabDirectivaComponent {

  constructor(private tabControlService: TabControlService){}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Capturar el tab para enfocar un elemento mediante una directiva
    if(event.key === "Tab"){
      this.tabControlService.emitTab(event);
    }
  }

  onContentFocus(){
    this.tabControlService.resetIndex();
  }
}
