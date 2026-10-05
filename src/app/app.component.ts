import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitantesIberaComponent } from './components/habitantes-ibera/habitantes-ibera.component';

interface Experiencia {
  titulo: string;
  desc: string;
  imagen: string;
}

interface Habitacion {
  nombre: string;
  descripcion: string;
  icono: string;
}

interface Servicio {
  titulo: string;
  detalle: string;
}

interface GaleriaItem {
  titulo: string;
  url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HabitantesIberaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  readonly logoUrl = 'assets/logo-verde-fondo-blanco.jpg'; 

  readonly experiencias = signal<Experiencia[]>([
    {
      titulo: 'La esencia de Mbarete',
      desc: 'Nuestra arquitectura tradicional de amplias galerías y cálida madera te da la bienvenida. Un refugio auténtico que respeta su entorno y te invita a desconectar desde el primer instante.',
      imagen: 'assets/21.1.jpg'
    },
    {
      titulo: 'Paisajes para contemplar',
      desc: 'El humedal invita a detenerse. Aquí el tiempo transcurre distinto, ofreciendo el escenario perfecto para compartir una pausa, escuchar el silencio y conectar profundamente con la naturaleza correntina.',
      imagen: 'assets/21.0.jpg'
    },
    {
      titulo: 'Descanso con identidad',
      desc: 'Habitaciones cálidas que invitan al reposo luego de un día bajo el sol. Detalles rústicos y comodidades pensadas para brindarte un descanso profundo, resguardando la auténtica identidad del lugar.',
      imagen: 'assets/21.2.jpg'
    },
    {
      titulo: 'Rincones para disfrutar',
      desc: 'Interiores serenos donde la tranquilidad cobra protagonismo. Vitrales coloridos y grandes ventanales desdibujan el límite entre adentro y afuera, enmarcando la belleza del paisaje para disfrutarlo sin prisa.',
      imagen: 'assets/23.jpg'
    }
  ]);

  readonly habitaciones = signal<Habitacion[]>([
    {
      nombre: 'Cabaña Selva',
      descripcion: 'Diseño cálido, natural e íntimo para descansar rodeado de árboles y tranquilidad.',
      icono: '🌿'
    },
    {
      nombre: 'Suite Iberá',
      descripcion: 'Espacio amplio para parejas o viajeros que buscan pausa, calma y comodidad auténtica.',
      icono: '🛏️'
    },
    {
      nombre: 'Bungalow Familiar',
      descripcion: 'Ideal para familias y grupos, con espacio para compartir y disfrutar la vida en la naturaleza.',
      icono: '🏠'
    }
  ]);

  readonly servicios = signal<Servicio[]>([
    {
      titulo: 'Piscina y descanso',
      detalle: 'Un rincón para relajarse bajo el sol y disfrutar del aire libre en plena naturaleza.'
    },
    {
      titulo: 'Desayuno casero',
      detalle: 'Comenzá el día con sabores regionales, calidez humana y una experiencia cercana.'
    },
    {
      titulo: 'Asistencia local',
      detalle: 'Te acompañamos para recorrer y disfrutar el Iberá con tranquilidad y recomendaciones útiles.'
    }
  ]);

  readonly puntos = signal<string[]>([
    'Ubicada en la zona de los Esteros del Iberá, en San Miguel, Corrientes',
    'Ideal para familias, parejas y viajeros que buscan desconectarse y recargar energías',
    'Ambiente tranquilo, auténtico y rodeado de naturaleza',
    'Atención cercana, experiencia cálida y descanso sin prisas'
  ]);

  currentImageIndex = signal(0);

  readonly galeria = signal<GaleriaItem[]>([
    { titulo: 'Entrada principal', url: 'assets/1.jpg' },
    { titulo: 'Atardecer en la pileta', url: 'assets/pileta-atardecer-1.jpg' },
    { titulo: 'Reflejos del Iberá', url: 'assets/pileta-atardecer-2.jpg' },
    { titulo: 'Habitaciones en calma', url: 'assets/nueva-habitacion.jpg' },
    { titulo: 'Frente de la posada', url: 'assets/galeria-7.jpg' },
    { titulo: 'Muelle bajo las estrellas', url: 'assets/nochembarete.jpg' }
  ]);

  nextImage() {
    this.currentImageIndex.update(i => (i + 1) % this.galeria().length);
  }

  prevImage() {
    this.currentImageIndex.update(i => (i - 1 + this.galeria().length) % this.galeria().length);
  }

  setImage(index: number) {
    this.currentImageIndex.set(index);
  }

  enviarWhatsApp() {
    const mensaje = encodeURIComponent(
      'Hola Posada Mbarete, quiero consultar disponibilidad y conocer más sobre la estadía en los Esteros del Iberá.'
    );
    const url = `https://wa.me/5493764123456?text=${mensaje}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
