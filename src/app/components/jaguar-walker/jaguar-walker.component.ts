import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChild, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-jaguar-walker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Botón de sonido -->
    <button 
      class="sound-toggle-btn"
      (click)="toggleSound()"
      [attr.aria-label]="isMuted() ? 'Activar sonido de los esteros' : 'Silenciar sonido de los esteros'"
      [class.is-active]="!isMuted()"
    >
      <div class="icon-wrapper">
        <span class="icon">{{ isMuted() ? '🔇' : '🔊' }}</span>
      </div>
      <span class="text">{{ isMuted() ? 'Escuchar los esteros' : 'Sonido activado' }}</span>
    </button>

    <div class="jaguar-walker">
      <!-- Video principal (Visual, a pantalla completa) -->
      <video 
        #jaguarVideo
        class="jaguar-video"
        src="assets/fauna/yaguarete/yaguarete-silent.mp4"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      ></video>

      <!-- Archivo de sonido (Oculto, usando el video viejo de fondo) -->
      <audio 
        #jungleAudio
        src="assets/fauna/yaguarete-audio.mp4"
        loop
        preload="auto"
      ></audio>

      <!-- Rugido del yaguareté -->
      <audio 
        #roarAudio
        src="assets/fauna/yaguarete/jaguar-sound.webm"
        preload="auto"
      ></audio>
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
    }

    /* Estilos del botón de sonido */
    .sound-toggle-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 50;
      pointer-events: auto;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(111, 122, 72, 0.2);
      border-radius: 9999px;
      padding: 8px 16px 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      color: #6F7A48;
      font-family: inherit;
      backdrop-filter: blur(4px);
    }

    .sound-toggle-btn:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(111,122,72,0.15);
    }

    .sound-toggle-btn.is-active {
      background: #6F7A48;
      color: white;
      border-color: #6F7A48;
    }

    .sound-toggle-btn .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }

    .sound-toggle-btn .icon {
      font-size: 1.1rem;
      line-height: 1;
    }

    .sound-toggle-btn .text {
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    
    .jaguar-walker {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .jaguar-video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover; 
      object-position: center 75%; /* Sube el video apenas un poco más para recortar el borde inferior */
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
  `]
})
export class JaguarWalkerComponent {
  @ViewChild('jaguarVideo') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('jungleAudio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('roarAudio') roarRef!: ElementRef<HTMLAudioElement>;
  
  isMuted = signal(true);
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleSound() {
    const audio = this.audioRef?.nativeElement;
    const roar = this.roarRef?.nativeElement;
    if (!audio) return;

    const newMutedState = !this.isMuted();
    this.isMuted.set(newMutedState);
    
    audio.muted = newMutedState;
    audio.volume = 1.0;
    
    if (audio.paused && !newMutedState) {
       audio.play().catch(() => {});
    }

    if (roar && !newMutedState) {
      // Reproducir el rugido solo cuando se activa el sonido, 
      // reseteándolo al principio si ya se había reproducido
      roar.currentTime = 0;
      roar.volume = 0.8; // Un poco más bajo que el ambiente si es muy fuerte
      roar.play().catch(() => {});
    }
  }

  start() {
    if (!this.isBrowser) return;
    
    // Arrancamos el video principal (visual) y el audio
    if (this.videoRef) {
      this.ngZone.runOutsideAngular(() => {
        this.videoRef.nativeElement.play().catch(() => {});
      });
    }
    if (this.audioRef) {
      this.ngZone.runOutsideAngular(() => {
        this.audioRef.nativeElement.muted = true;
        this.audioRef.nativeElement.play().catch(() => {});
      });
    }
  }

  stop() {
    if (this.videoRef) this.videoRef.nativeElement.pause();
    if (this.audioRef) this.audioRef.nativeElement.pause();
    if (this.roarRef) this.roarRef.nativeElement.pause();
  }
}
