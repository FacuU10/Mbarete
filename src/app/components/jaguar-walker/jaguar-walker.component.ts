import { Component, ChangeDetectionStrategy, signal, ElementRef, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-jaguar-walker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="jaguar-wrapper" [style.transform]="'translate3d(' + xPos() + 'px, 0, 0)'">
      <div class="jaguar-container">
        <img [src]="frames[currentFrame()]" alt="" aria-hidden="true" class="jaguar-img" />
        <div class="jaguar-shadow"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    }
    
    .jaguar-wrapper {
      position: absolute;
      bottom: 5px;
      left: 0px;
      will-change: transform;
      /* Suavizar el paso atado al scroll para que no pegue tirones */
      transition: transform 0.15s ease-out;
    }
    
    .jaguar-container {
      position: relative;
      display: inline-block;
    }
    
    .jaguar-img {
      height: clamp(80px, 10vw, 130px);
      width: auto;
      object-fit: contain;
      position: relative;
      z-index: 2;
    }
    
    .jaguar-shadow {
      position: absolute;
      bottom: 5px;
      left: 10%;
      width: 80%;
      height: 6px;
      background: rgba(0, 0, 0, 0.12);
      filter: blur(4px);
      border-radius: 50%;
      z-index: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .jaguar-wrapper {
        transition: none;
      }
    }
  `]
})
export class JaguarWalkerComponent implements OnInit {
  frames = Array.from({length: 5}, (_, i) => 'assets/wildlife/jaguar/jaguar-frame-0' + (i + 1) + '.png');
  currentFrame = signal(0);
  xPos = signal(-300); // Start offscreen left
  
  private isBrowser = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.preloadFrames();
      // Forzar el cálculo inicial para ubicarlo donde debe ir según el scroll actual
      setTimeout(() => this.onScroll(), 100);
    }
  }

  private preloadFrames() {
    this.frames.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onScroll() {
    if (!this.isBrowser) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Si el usuario no quiere animaciones, dejamos fijo al yaguareté
      this.xPos.set(100);
      this.currentFrame.set(0);
      return;
    }

    // El elemento padre define el "terreno" por donde camina
    const rect = this.el.nativeElement.parentElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Solo animar si la sección del yaguareté está visible en pantalla
    if (rect.top < windowHeight && rect.bottom > 0) {
      // Calcular qué porcentaje de la sección hemos cruzado con el scroll
      const totalScroll = windowHeight + rect.height;
      const currentScroll = windowHeight - rect.top;
      
      let progress = currentScroll / totalScroll;
      progress = Math.max(0, Math.min(1, progress));
      
      // Mapear ese porcentaje a la posición X en la pantalla
      // Va desde -150px (izquierda) hasta el ancho total + 150px (derecha)
      const windowWidth = window.innerWidth;
      const newX = (progress * (windowWidth + 300)) - 150;
      
      this.xPos.set(newX);
      
      // Mapear la distancia recorrida en X a los frames (para que parezca que los pasos avanzan con el scroll)
      // Cada ~35 píxeles de avance, cambia un frame
      const frameIdx = Math.floor(newX / 35) % this.frames.length;
      this.currentFrame.set(Math.abs(frameIdx));
    }
  }
}
