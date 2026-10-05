import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChild, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-jaguar-walker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="jaguar-walker" [class.is-walking]="isWalking()">
      <video 
        #jaguarVideo
        class="jaguar-video"
        src="assets/fauna/yaguarete/yaguarete.mp4"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      ></video>
      <div class="jaguar-shadow"></div>
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
    
    .jaguar-walker {
      position: absolute;
      bottom: 5px;
      /* Inicia pegado al borde izquierdo */
      left: 0; 
      will-change: transform;
      width: clamp(360px, 38vw, 560px);
    }
    
    .jaguar-walker.is-walking {
      /* Bucle más rápido y constante (10 segundos) */
      animation: walkAcross 10s linear infinite;
    }
    
    .jaguar-video {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
      pointer-events: none;
      position: relative;
      z-index: 2;
      /* Magia CSS para borrar fondos blancos/grises sobre fondos claros */
      mix-blend-mode: multiply;
      /* Ajuste para que el animal no pierda fuerza por el multiply */
      filter: contrast(1.1) saturate(1.1); 
    }
    
    .jaguar-shadow {
      position: absolute;
      bottom: 12px;
      left: 15%;
      width: 70%;
      height: 10px;
      background: rgba(0, 0, 0, 0.15);
      filter: blur(6px);
      border-radius: 50%;
      z-index: 1;
    }
    
    @keyframes walkAcross {
      /* En 'transform', los porcentajes (%) se calculan según el tamaño del propio yaguareté */
      /* 0%: Empieza corrido hacia la izquierda justo su propio ancho (-100%), listo para asomar */
      0% { transform: translate3d(-100%, 0, 0); }
      /* 100%: Viaja exactamente el ancho de la pantalla (100vw) para esconderse por la derecha */
      100% { transform: translate3d(100vw, 0, 0); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .jaguar-walker.is-walking {
        animation: none;
        transform: translate3d(15vw, 0, 0);
      }
    }
  `]
})
export class JaguarWalkerComponent {
  @ViewChild('jaguarVideo') videoRef!: ElementRef<HTMLVideoElement>;
  isWalking = signal(false);
  
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  start() {
    if (!this.isBrowser || this.isWalking()) return;
    
    if (window.innerWidth < 768) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.isWalking.set(true);
    
    if (!prefersReducedMotion && this.videoRef) {
      this.ngZone.runOutsideAngular(() => {
        this.videoRef.nativeElement.play().catch(e => {
          console.warn("Autoplay bloqueado o falló: ", e);
        });
      });
    }
  }

  stop() {
    this.isWalking.set(false);
    if (this.videoRef) {
      this.videoRef.nativeElement.pause();
    }
  }
}
