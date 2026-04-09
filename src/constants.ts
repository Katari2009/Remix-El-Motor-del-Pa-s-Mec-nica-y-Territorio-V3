import { Level, Badge, Manual } from './types';

export const BADGES: Badge[] = [
  {
    id: 'eagle-eye',
    name: 'Ojo de Águila',
    description: 'Por resolver un caso de estudio sin errores.',
    icon: 'Search',
    criteria: 'Completa un caso de estudio.'
  },
  {
    id: 'active-citizen',
    name: 'Ciudadano Activo',
    description: 'Por completar la propuesta de intervención comunal.',
    icon: 'Users',
    criteria: 'Completa el Proyecto Técnico-Social.'
  },
  {
    id: 'master-mechanic',
    name: 'Maestro Matricero',
    description: 'Por completar todos los niveles del curso.',
    icon: 'Wrench',
    criteria: 'Completa todas las actividades.'
  }
];

export const MANUALS: Manual[] = [
  {
    id: 'm-1',
    title: 'Plano de Torno CNC',
    description: 'Diagrama técnico que muestra la relación entre el panel de control (Estado) y los ejes de mecanizado (Comunas).',
    imageUrl: '/plano-torno.png',
    category: 'maquinaria'
  },
  {
    id: 'm-2',
    title: 'Mapa de Cadena de Suministro',
    description: 'Esquema de las principales rutas de abastecimiento de acero y herramientas de corte en las regiones.',
    imageUrl: '/mapa-suministro.png',
    category: 'territorio'
  },
  {
    id: 'm-3',
    title: 'Protocolo de Mantenimiento Industrial',
    description: 'Guía de pasos para asegurar la continuidad operativa en maestranzas y líneas de producción.',
    imageUrl: '/protocolo-mantenimiento.png',
    category: 'logistica'
  }
];

export const LEVELS: Level[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Territorial',
    subtitle: 'El Plano de nuestra Geografía',
    icon: 'Settings2',
    description: 'Comprende cómo se organiza Chile comparándolo con una planta de producción industrial. Analiza el centralismo y el impacto en las maestranzas regionales.',
    unlockedAt: 0,
    activities: [
      {
        id: 'diag-1',
        type: 'quiz',
        title: 'La Analogía de la Planta',
        description: '¿Qué parte de la planta de producción representa a las comunas y municipalidades?',
        points: 50,
        content: {
          questions: [
            {
              question: 'Según el plano técnico de la administración, ¿qué representan las Comunas?',
              options: ['La gerencia central', 'Las máquinas herramientas locales', 'El sistema de refrigeración', 'La materia prima'],
              correct: 1
            },
            {
              question: '¿Qué sucede si la instrucción del panel de control central no baja eficientemente a la máquina herramienta?',
              options: ['La máquina se apaga', 'El país pierde capacidad productiva', 'Aumenta la velocidad de corte', 'No sucede nada'],
              correct: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 'logistica',
    title: 'Producción e Impacto',
    subtitle: 'Las Cadenas de Suministro',
    icon: 'Truck',
    description: 'Analiza por qué una herramienta de corte especializada tarda más en llegar a regiones y cómo esto afecta la mecánica industrial.',
    unlockedAt: 100,
    activities: [
      {
        id: 'log-1',
        type: 'case-study',
        title: 'Caso: Falla en la Fresadora CNC',
        description: 'Analiza la detención de una línea de producción por falla en el husillo principal.',
        points: 100,
        content: {
          situation: 'Falla crítica en el husillo de una fresadora CNC en una maestranza regional. Ubicación: Zona industrial alejada de la capital. Problema: Falta de proveedores locales especializados. Repuesto importado retenido en aduana central.',
          questions: [
            '¿Cómo la falta de descentralización industrial y proveedores locales agravó esta falla?',
            '¿Qué solución de mecanizado o gestión propondrías desde la maestranza?'
          ]
        }
      }
    ]
  },
  {
    id: 'responsabilidad',
    title: 'El Ciudadano Técnico',
    subtitle: 'Responsabilidad Social e Individual',
    icon: 'UserCheck',
    description: 'Descubre tu rol fundamental. No solo operas y mantienes máquinas herramientas, mantienes la industria de tu región en movimiento.',
    unlockedAt: 250,
    activities: [
      {
        id: 'resp-1',
        type: 'quiz',
        title: 'Ética y Entorno Industrial',
        description: 'Evalúa situaciones de responsabilidad en la maestranza.',
        points: 75,
        content: {
          questions: [
            {
              question: '¿Cuál es un ejemplo de Responsabilidad Individual en la maestranza?',
              options: ['Votar en elecciones', 'Calidad en el mecanizado para prevenir fallas estructurales', 'Participar en el Plan Regulador', 'Exigir mejor alumbrado'],
              correct: 1
            },
            {
              question: '¿Qué implica la Responsabilidad Social del técnico en máquinas y herramientas?',
              options: ['Solo operar el torno', 'Ser el eslabón crítico entre la tecnología industrial y el desarrollo de la comunidad', 'Cobrar lo más posible por pieza', 'Trabajar aislado'],
              correct: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 'proyecto',
    title: 'Proyecto Técnico-Social',
    subtitle: 'Diseña tu Solución',
    icon: 'PenTool',
    description: 'Aplica todo lo aprendido para diseñar una intervención técnica-industrial en tu propia comuna.',
    unlockedAt: 400,
    activities: [
      {
        id: 'proj-1',
        type: 'design',
        title: 'Proyecto de Maestranza Comunal',
        description: 'Crea un proyecto de fabricación o mantenimiento que resuelva un problema industrial local.',
        points: 200,
        content: {
          sections: [
            'Diagnóstico Territorial: ¿Qué problema industrial o de infraestructura sufre tu comuna?',
            'Solución de Fabricación/Mantenimiento: Propuesta técnica desde la mecánica industrial.',
            'Aliados Cívicos: ¿A qué organizaciones o empresas locales debes involucrar?'
          ]
        }
      }
    ]
  }
];

export const RANKS = [
  { min: 0, name: 'Aprendiz de Taller' },
  { min: 100, name: 'Operador de Máquinas' },
  { min: 250, name: 'Técnico Matricero' },
  { min: 450, name: 'Maestro Industrial-Social' }
];
