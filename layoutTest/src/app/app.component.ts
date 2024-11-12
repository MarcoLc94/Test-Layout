import { Component, HostListener, ViewChild, ElementRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';

const width = window.innerWidth
  console.log(width)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FormsModule, DropdownComponent],
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

  dropdownOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' }
  ];

  onSelectionChange(value: any) {
    console.log('Selected value:', value);
  }

  focusOnInput(event: Event): void {
    const input = this.inputElement.nativeElement as HTMLInputElement;
    if (document.activeElement !== input) {
      input.focus();
    }
  }
}
