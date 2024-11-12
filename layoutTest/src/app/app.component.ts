import { Component, HostListener, ViewChild, ElementRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownComponent2 } from './components/dropdown2/dropdown2.component';

const width = window.innerWidth
  console.log(width)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FormsModule, DropdownComponent, DropdownComponent2],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  viewportWidth: number;
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor() {
    this.viewportWidth = window.innerWidth; // Establece el valor inicial
  }

  ngOnInit(): void {
    this.logViewportWidth(); // Consola inicial
  }

  // Escucha el cambio de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.viewportWidth = (event.target as Window).innerWidth; 
    this.logViewportWidth();
  }

  // Función para imprimir el ancho del viewport
  logViewportWidth(): void {
    console.log(`Ancho del viewport: ${this.viewportWidth}px`);
  }
  
  cities: string[] = ["new york", "michigan", "chicago"]
  city: string = ""

  addCity = () => {
    console.log(this.city)
    if(this.city.trim()){
      this.cities.push(this.city)
    }
    this.city = ""
  }



  onSelectionChange(value: any) {
    console.log('Selected value:', value);
  }

  dropdownOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  onOptionSelected(event: any) {
    console.log('Selected option:', event);
  }

  focusOnInput(event: Event): void {
    const input = this.inputElement.nativeElement as HTMLInputElement;
    if (document.activeElement !== input) {
      input.focus();
    }
  }
}
