import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { JaguarWalkerComponent } from '../jaguar-walker/jaguar-walker.component';

@Component({
  selector: 'app-habitantes-ibera',
  standalone: true,
  imports: [CommonModule, JaguarWalkerComponent],
  template: `
    <section class="overflow-hidden bg-[#F9F8F6] py-24 relative" #section>
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <!-- Header -->
        <div class="text-center mb-16 transition-all duration-1000 ease-out" 
             [class.opacity-0]="!isVisible" [class.translate-y-8]="!isVisible">
          <p class="uppercase tracking-[0.3em] text-[#6F7A48] text-sm font-semibold mb-4">Habitantes del Iberá</p>
          <h2 class="text-4xl md:text-5xl font-light text-[#374151] m-0">Una tierra que vuelve a ser hogar.</h2>
        </div>

        <!-- Jaguar Walk Zone -->
        <div class="jaguar-walk-zone relative w-full h-40 md:h-56 mb-16 border-b border-[#6F7A48]/10 overflow-hidden transition-opacity duration-1000"
             [class.opacity-0]="!isVisible"
             style="background-color: #F9F8F6; background-image: linear-gradient(0deg, rgba(111,122,72,0) 0%, rgba(111,122,72,0.03) 100%); overflow-x: clip;">
          
          <!-- Vegetación de fondo (Capa trasera) -->
          <div class="absolute bottom-0 w-full h-full opacity-10" 
               style="background-image: radial-gradient(ellipse at 50% 120%, #6F7A48 0%, transparent 50%);">
          </div>
          
          <!-- Capa media: Yaguareté -->
          <app-jaguar-walker #jaguar></app-jaguar-walker>

          <!-- Vegetación de primer plano (Capa delantera) -->
          <div class="absolute bottom-0 w-full h-12 opacity-40 z-10 pointer-events-none filter blur-[1px]" 
               style="background: linear-gradient(0deg, rgba(111,122,72,0.15) 0%, transparent 100%);">
          </div>
        </div>

        <!-- Content Grid (Organic) -->
        <div class="space-y-32">
          
          <div class="flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 delay-100 ease-out"
               [class.opacity-0]="!isVisible" [class.translate-y-8]="!isVisible">
            <div class="w-full md:w-1/2">
              <div class="overflow-hidden rounded-2xl aspect-[4/3] md:aspect-square lg:aspect-[4/5] shadow-xl bg-gray-100">
                <img src="assets/wildlife/yaguarete-photo.jpg" alt="Yaguareté" class="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[2s] ease-out">
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-12">
              <h3 class="text-3xl font-medium text-[#6F7A48] mb-6">Yaguareté</h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                Después de 70 años de ausencia, el yaguareté volvió a los Esteros del Iberá. 
                Su regreso se convirtió en uno de los grandes símbolos de la recuperación de este ecosistema.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row-reverse items-center gap-12 transition-all duration-1000 delay-200 ease-out"
               [class.opacity-0]="!isVisible" [class.translate-y-8]="!isVisible">
            <div class="w-full md:w-1/2">
              <div class="overflow-hidden rounded-2xl aspect-[4/3] md:aspect-square lg:aspect-[4/5] shadow-xl bg-gray-100">
                <img src="assets/wildlife/carpincho-photo.jpg" alt="Carpincho" class="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[2s] ease-out">
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pr-12">
              <h3 class="text-3xl font-medium text-[#6F7A48] mb-6">Carpincho</h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                Habitante inseparable de lagunas y bañados, el carpincho forma parte de las escenas cotidianas del Iberá. 
                Tranquilo y sociable, es uno de los grandes protagonistas de sus paisajes.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 delay-300 ease-out"
               [class.opacity-0]="!isVisible" [class.translate-y-8]="!isVisible">
            <div class="w-full md:w-1/2">
              <div class="overflow-hidden rounded-2xl aspect-[4/3] md:aspect-square lg:aspect-[4/5] shadow-xl bg-gray-100">
                <img src="assets/wildlife/ciervo-photo.jpg" alt="Ciervo de los pantanos" class="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[2s] ease-out">
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-12">
              <h3 class="text-3xl font-medium text-[#6F7A48] mb-6">Ciervo de los pantanos</h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                Entre pastizales y humedales aparece uno de los grandes habitantes del Iberá. 
                Elegante y sereno, encuentra en estos ambientes uno de sus refugios naturales.
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row-reverse items-center gap-12 transition-all duration-1000 delay-500 ease-out"
               [class.opacity-0]="!isVisible" [class.translate-y-8]="!isVisible">
            <div class="w-full md:w-1/2 relative">
              <div class="overflow-hidden rounded-2xl aspect-[4/3] md:aspect-square lg:aspect-[4/5] shadow-xl bg-gray-100">
                <img src="assets/wildlife/yetapa-photo.jpg" alt="Yetapá de collar" class="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[2s] ease-out">
              </div>
              <div class="absolute inset-0 pointer-events-none" id="yetapa-flight-zone"></div>
            </div>
            <div class="w-full md:w-1/2 md:pr-12">
              <h3 class="text-3xl font-medium text-[#6F7A48] mb-6">Yetapá de collar</h3>
              <p class="text-lg text-gray-600 leading-relaxed">
                Pequeño, ágil y característico de los pastizales, el Yetapá de collar es una de las aves emblemáticas del Iberá. 
                Su larga cola acompaña su vuelo sobre el humedal.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HabitantesIberaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section') sectionRef!: ElementRef;
  @ViewChild('jaguar') jaguarComponent!: JaguarWalkerComponent;
  
  isVisible = false;
  private observer: IntersectionObserver | null = null;
  private hasJaguarPlayed = false;
  private timeoutId: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            
            // 1. Mostrar contenido
            this.ngZone.run(() => {
              this.isVisible = true;
              this.cdr.detectChanges();
            });

            // 2. Disparar caminata de Yaguareté
            if (!this.hasJaguarPlayed) {
              this.hasJaguarPlayed = true;
              
              // Esperar ~1000ms para crear expectativa
              this.timeoutId = setTimeout(() => {
                if (this.jaguarComponent) {
                  this.jaguarComponent.start();
                }
              }, 1000);
            }

            // Dejar de observar para asegurar que ocurra una sola vez
            if (this.sectionRef) {
              this.observer?.unobserve(this.sectionRef.nativeElement);
            }
          }
        });
      }, { threshold: 0.05 }); // Se dispara apenas entra un 5% de la sección (soluciona el problema de secciones muy altas)

      if (this.sectionRef) {
        this.observer.observe(this.sectionRef.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
