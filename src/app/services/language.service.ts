import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LanguageContent {
  header: {
    navigation: {
      about: string;
      benefits: string;
      testimonials: string;
      plans: string;
      mentor: string;
      studentArea: string;
      apply: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    stats: {
      students: string;
      experience: string;
      method: string;
    };
    buttons: {
      apply: string;
      learnMore: string;
    };
  };
  benefits: {
    title: string;
    subtitle: string;
    items: Array<{
      // icon: string;
      title: string;
      description: string;
    }>;
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  testimonials: {
    badge: string;
    title: string;
    items: Array<{
      text: string;
      name: string;
      title: string;
      location: string;
    }>;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    guarantee: string;
    secure: string;
    popular: string;
    plan: {
      title: string;
      description: string;
      price: string;
      period: string;
      features: string[];
      featured?: boolean;
      badge?: string;
    };
    protection: {
      title: string;
      description: string;
    };
    savings: {
      title: string;
      description: string;
    };
  };
  mentor: {
    badge: string;
    title: string;
    stats: {
      experience: string;
      students: string;
      position: string;
    };
    name: string;
    description: string;
    highlight: string;
    journey: {
      title: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  footer: {
    brand: {
      description: string;
    };
    links: {
      course: {
        title: string;
        items: string[];
      };
      support: {
        title: string;
        items: string[];
      };
      contact: {
        title: string;
        phone: string;
        email: string;
        location: string;
      };
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
    copyright: string;
    security: {
      ssl: string;
      secure: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('pt');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private content: { [key: string]: LanguageContent } = {
    pt: {
      header: {
        navigation: {
          about: 'Sobre o Curso',
          benefits: 'Benefícios',
          testimonials: 'Depoimentos',
          plans: 'Planos',
          mentor: 'Mentor',
          studentArea: 'Área do Aluno',
          apply: 'Quero fazer minha aplicação'
        }
      },
      hero: {
        badge: 'Vagas abertas para a formação',
        title: 'O plano prático para você conquistar a sua aprovação de forma',
        subtitle: 'simples e segura',
        description: 'Esse é um passo a passo validado para profissionais da odontologia na América Latina terem um diploma válido nos Estados Unidos.',
        stats: {
          students: 'Alunos aprovados',
          experience: 'Anos de experiência',
          method: 'Método validado'
        },
        buttons: {
          apply: 'Quero fazer minha aplicação',
          learnMore: 'Saiba mais'
        }
      },
      benefits: {
        title: 'Com o nosso treinamento, você será capaz de:',
        subtitle: 'OS BENEFÍCIOS',
        items: [
          {
            title: 'Conseguir ser aprovado no Board de primeira',
            description: 'Método validado que aumenta suas chances de aprovação logo na primeira tentativa.'
          },
          {
            title: 'Exercer a odontologia de forma legal nos EUA',
            description: 'Tenha seu diploma reconhecido e pratique sua profissão legalmente nos Estados Unidos.'
          },
          {
            title: 'Voltar a viver com qualidade e recebendo o quanto merece',
            description: 'Receba em dólar um salário compatível com a valorização que sua profissão merece.'
          },
          {
            title: 'Criar um nome para você no mercado da saúde nos EUA',
            description: 'Construa uma reputação sólida e se destaque no mercado odontológico americano.'
          },
          {
            title: 'Superar as burocracias para ser um profissional de saúde na América',
            description: 'Navegue com segurança por todos os processos burocráticos necessários.'
          },
          {
            title: 'Ser reconhecido no Brasil e fora dele como um profissional fora da curva',
            description: 'Ganhe reconhecimento internacional e se torne referência em sua área.'
          }
        ],
        cta: {
          
          title: 'Garanta a sua aprovação e exerça a sua odontologia para receber em dólar nos Estados Unidos!',
          description: 'Esse é o treinamento preparatório que vai te ajudar a ingressar no mercado norte-americano, com capacidade de exercer a sua profissão com segurança e confiança para criar um negócio de saúde muito rentável.',
          button: 'É isso mesmo que eu quero'
        }
      },
      testimonials: {
        badge: 'VALIDADO POR DENTISTAS APROVADOS',
        title: 'Confira o que dizem sobre o curso:',
        items: [
          {
            text: 'O método Brazucas foi fundamental para minha aprovação. O suporte do Rodrigo e a metodologia estruturada me deram a confiança necessária para passar no board de primeira. Hoje exerço minha profissão legalmente nos EUA!',
            name: 'Roberta Cardoso',
            title: 'Cirurgiã Dentista',
            location: 'Miami, FL'
          },
          {
            text: 'Depois de anos tentando entender o processo sozinha, encontrei no Brazucas a direção que precisava. As aulas são práticas e focadas no que realmente importa para a prova. Recomendo para todos os colegas!',
            name: 'Patricia Medrado',
            title: 'Dentista',
            location: 'Orlando, FL'
          },
          {
            text: 'O diferencial do curso é o suporte ilimitado. Sempre que tinha dúvidas, recebia respostas rápidas e detalhadas. Isso fez toda a diferença na minha preparação e aprovação no INBDE.',
            name: 'Samantha Matos',
            title: 'Cirurgiã Dentista',
            location: 'Houston, TX'
          },
          {
            text: 'Método validado e eficiente! O Rodrigo conhece profundamente o processo e sabe exatamente o que é necessário para ser aprovado. Hoje tenho meu consultório próprio nos EUA graças ao Brazucas.',
            name: 'Aurora Rita',
            title: 'Dentista',
            location: 'Los Angeles, CA'
          },
          {
            text: 'A metodologia é clara e objetiva. Não perde tempo com informações desnecessárias, foca no que realmente cai na prova. Os simulados foram essenciais para minha preparação e confiança no dia da prova.',
            name: 'Déia Yamamoto',
            title: 'Dentista',
            location: 'New York, NY'
          }
        ]
      },
      pricing: {
        badge: 'OS PLANOS',
        title: 'Brazucas no Board',
        subtitle: 'Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada rumo à aprovação no INBDE.',
        guarantee: 'Garantia de 7 dias',
        secure: 'Compra segura',
        popular: 'MAIS POPULAR',
        plan: {
          title: 'Individual',
          description: 'Nesse módulo você terá acesso ao curso por 5 meses, tendo aulas online e ao vivo com acesso a simulados e exercícios.',
          price: '$950',
          period: 'valor por cada mês',
          features: [
            '2 encontros na semana de 1h',
            '1 encontro de 3h no grupo geral por semana (com resolução de exercícios)',
            '3 simulados da prova',
            '1 aulão final na véspera da prova (que acontece dia antes) de 3h',
            'Suporte ilimitado via WhatsApp',
            'Material didático completo',
            'Acesso à plataforma por 5 meses'
          ]
        },
        protection: {
          title: 'Você está totalmente protegido!',
          description: 'Isso mesmo, você está totalmente protegido e investir o seu dinheiro no treinamento não é um risco. Justamente porque durante 7 dias, você tem garantia incondicional, portanto pode garantir a sua vaga e caso dentro desse período sinta que o treinamento não é para você, eu devolvo todo o seu dinheiro.'
        },
        savings: {
          title: 'Você economiza mais de U$ 1 mil dólares ao garantir sua vaga em grupo ou individual!',
          description: 'Investimento que se paga com o primeiro mês de trabalho nos EUA.'
        }
      },
      mentor: {
        badge: 'UM POUCO SOBRE...',
        title: 'Quem será o seu mentor?',
        stats: {
          experience: '19 anos de experiência',
          students: '10+ alunos aprovados',
          position: 'CEO Brazucas no Board'
        },
        name: 'Rodrigo Fernandes',
        description: 'CEO do Brazucas, formado em odontologia há 19 anos e mentor de dentistas. Eu vou te ajudar nesta caminhada de estudos para validação do seu diploma aqui nos Estados Unidos, para que você desfrute da abundância de uma vida com felicidade, valorização e respeito por ser um profissional de sucesso.',
        highlight: 'Esse é apenas o passo que falta para mudar a sua vida profissional, assim como mudou a delas. E agora é a sua vez!',
        journey: {
          title: 'Minha Jornada',
          steps: [
            {
              title: 'Chegada aos EUA',
              description: 'Como muitos, comecei fazendo trabalhos diversos para me sustentar'
            },
            {
              title: 'Descoberta do Processo',
              description: 'Entendi que existia uma forma de ser aprovado no board'
            },
            {
              title: 'Aprovação e Sucesso',
              description: 'Hoje atuo na minha profissão e ajudo outros a conquistarem o mesmo'
            }
          ]
        }
      },
      footer: {
        brand: {
          description: 'Ajudamos dentistas da América Latina a validarem seus diplomas nos Estados Unidos através de um método comprovado e suporte especializado.'
        },
        links: {
          course: {
            title: 'Curso',
            items: ['Sobre o INBDE', 'Metodologia', 'Cronograma', 'Material Didático']
          },
          support: {
            title: 'Suporte',
            items: ['FAQ', 'Suporte Técnico', 'Comunidade', 'Recursos']
          },
          contact: {
            title: 'Contato',
            phone: '+1 (555) 123-4567',
            email: 'contato@brazucasnoboard.com',
            location: 'Estados Unidos'
          }
        },
        cta: {
          title: 'Pronto para começar sua jornada?',
          description: 'Junte-se aos dentistas que já conquistaram a aprovação no INBDE e estão exercendo a profissão legalmente nos EUA.',
          button: 'Quero fazer minha aplicação'
        },
        copyright: '© 2024 Brazucas no Board. Todos os direitos reservados.',
        security: {
          ssl: 'SSL Seguro',
          secure: 'Pagamento Seguro'
        }
      }
    },
    es: {
      header: {
        navigation: {
          about: 'Sobre el Curso',
          benefits: 'Beneficios',
          testimonials: 'Testimonios',
          plans: 'Planes',
          mentor: 'Mentor',
          studentArea: 'Área del Estudiante',
          apply: 'Quiero hacer mi aplicación'
        }
      },
      hero: {
        badge: 'Plazas abiertas para la formación',
        title: 'El plan práctico para conquistar tu aprobación de forma',
        subtitle: 'simple y segura',
        description: 'Este es un paso a paso validado para profesionales de la odontología en América Latina que quieren tener un diploma válido en Estados Unidos.',
        stats: {
          students: 'Estudiantes aprobados',
          experience: 'Años de experiencia',
          method: 'Método validado'
        },
        buttons: {
          apply: 'Quiero hacer mi aplicación',
          learnMore: 'Saber más'
        }
      },
      benefits: {
        title: 'Con nuestro entrenamiento, serás capaz de:',
        subtitle: 'LOS BENEFICIOS',
        items: [
          {
            title: 'Conseguir ser aprobado en el Board a la primera',
            description: 'Método validado que aumenta tus posibilidades de aprobación en el primer intento.'
          },
          {
            title: 'Ejercer la odontología de forma legal en EE.UU.',
            description: 'Ten tu diploma reconocido y practica tu profesión legalmente en Estados Unidos.'
          },
          {
            title: 'Volver a vivir con calidad y recibiendo lo que mereces',
            description: 'Recibe en dólares un salario compatible con la valorización que tu profesión merece.'
          },
          {
            title: 'Crear un nombre para ti en el mercado de la salud en EE.UU.',
            description: 'Construye una reputación sólida y destácate en el mercado odontológico americano.'
          },
          {
            title: 'Superar las burocracias para ser un profesional de salud en América',
            description: 'Navega con seguridad por todos los procesos burocráticos necesarios.'
          },
          {
            title: 'Ser reconocido en Brasil y fuera de él como un profesional fuera de serie',
            description: 'Gana reconocimiento internacional y conviértete en referencia en tu área.'
          }
        ],
        cta: {
          title: '¡Garantiza tu aprobación y ejerce tu odontología para recibir en dólares en Estados Unidos!',
          description: 'Este es el entrenamiento preparatorio que te ayudará a ingresar al mercado norteamericano, con capacidad de ejercer tu profesión con seguridad y confianza para crear un negocio de salud muy rentable.',
          button: 'Eso es exactamente lo que quiero'
        }
      },
      testimonials: {
        badge: 'VALIDADO POR DENTISTAS APROBADOS',
        title: 'Mira lo que dicen sobre el curso:',
        items: [
          {
            text: 'El método Brazucas fue fundamental para mi aprobación. El apoyo de Rodrigo y la metodología estructurada me dieron la confianza necesaria para pasar el board a la primera. ¡Hoy ejerzo mi profesión legalmente en EE.UU.!',
            name: 'Roberta Cardoso',
            title: 'Cirujana Dentista',
            location: 'Miami, FL'
          },
          {
            text: 'Después de años tratando de entender el proceso sola, encontré en Brazucas la dirección que necesitaba. Las clases son prácticas y enfocadas en lo que realmente importa para el examen. ¡Lo recomiendo a todos los colegas!',
            name: 'Patricia Medrado',
            title: 'Dentista',
            location: 'Orlando, FL'
          },
          {
            text: 'El diferencial del curso es el apoyo ilimitado. Siempre que tenía dudas, recibía respuestas rápidas y detalladas. Eso hizo toda la diferencia en mi preparación y aprobación del INBDE.',
            name: 'Samantha Matos',
            title: 'Cirujana Dentista',
            location: 'Houston, TX'
          },
          {
            text: '¡Método validado y eficiente! Rodrigo conoce profundamente el proceso y sabe exactamente lo que es necesario para ser aprobado. Hoy tengo mi consultorio propio en EE.UU. gracias a Brazucas.',
            name: 'Aurora Rita',
            title: 'Dentista',
            location: 'Los Angeles, CA'
          },
          {
            text: 'La metodología es clara y objetiva. No pierde tiempo con información innecesaria, se enfoca en lo que realmente aparece en el examen. Los simulacros fueron esenciales para mi preparación y confianza el día del examen.',
            name: 'Déia Yamamoto',
            title: 'Dentista',
            location: 'New York, NY'
          }
        ]
      },
      pricing: {
        badge: 'LOS PLANES',
        title: 'Brazucas no Board',
        subtitle: 'Elige el plan que mejor se adapte a tus necesidades y comienza tu jornada hacia la aprobación del INBDE.',
        guarantee: 'Garantía de 7 días',
        secure: 'Compra segura',
        popular: 'MÁS POPULAR',
        plan: {
          title: 'Individual',
          description: 'En este módulo tendrás acceso al curso por 5 meses, con clases online y en vivo con acceso a simulacros y ejercicios.',
          price: '$950',
          period: 'valor por cada mes',
          features: [
            '2 encuentros por semana de 1h',
            '1 encuentro de 3h en el grupo general por semana (con resolución de ejercicios)',
            '3 simulacros del examen',
            '1 clase magistral final en la víspera del examen (que ocurre el día anterior) de 3h',
            'Apoyo ilimitado vía WhatsApp',
            'Material didáctico completo',
            'Acceso a la plataforma por 5 meses'
          ]
        },
        protection: {
          title: '¡Estás totalmente protegido!',
          description: 'Así es, estás totalmente protegido e invertir tu dinero en el entrenamiento no es un riesgo. Justamente porque durante 7 días, tienes garantía incondicional, por lo tanto puedes garantizar tu plaza y en caso de que dentro de ese período sientas que el entrenamiento no es para ti, te devuelvo todo tu dinero.'
        },
        savings: {
          title: '¡Ahorras más de U$ 1 mil dólares al garantizar tu plaza en grupo o individual!',
          description: 'Inversión que se paga con el primer mes de trabajo en EE.UU.'
        }
      },
      mentor: {
        badge: 'UN POCO SOBRE...',
        title: '¿Quién será tu mentor?',
        stats: {
          experience: '19 años de experiencia',
          students: '10+ estudiantes aprobados',
          position: 'CEO Brazucas no Board'
        },
        name: 'Rodrigo Fernandes',
        description: 'CEO de Brazucas, graduado en odontología hace 19 años y mentor de dentistas. Te voy a ayudar en esta caminata de estudios para validación de tu diploma aquí en Estados Unidos, para que disfrutes de la abundancia de una vida con felicidad, valorización y respeto por ser un profesional exitoso.',
        highlight: '¡Encontré la forma de ser aprobado en el board y ayudo a otros a conquistar lo mismo!',
        journey: {
          title: 'Mi Jornada',
          steps: [
            {
              title: 'Llegada a EE.UU.',
              description: 'Como muchos, comencé haciendo trabajos diversos para sustentarme'
            },
            {
              title: 'Descubrimiento del Proceso',
              description: 'Entendí que existía una forma de ser aprobado en el board'
            },
            {
              title: 'Aprobación y Éxito',
              description: 'Hoy actúo en mi profesión y ayudo a otros a conquistar lo mismo'
            }
          ]
        }
      },
      footer: {
        brand: {
          description: 'Ayudamos a dentistas de América Latina a validar sus diplomas en Estados Unidos a través de un método comprobado y apoyo especializado.'
        },
        links: {
          course: {
            title: 'Curso',
            items: ['Sobre el INBDE', 'Metodología', 'Cronograma', 'Material Didáctico']
          },
          support: {
            title: 'Apoyo',
            items: ['FAQ', 'Apoyo Técnico', 'Comunidad', 'Recursos']
          },
          contact: {
            title: 'Contacto',
            phone: '+1 (555) 123-4567',
            email: 'contacto@brazucasnoboard.com',
            location: 'Estados Unidos'
          }
        },
        cta: {
          title: '¿Listo para comenzar tu jornada?',
          description: 'Únete a los dentistas que ya conquistaron la aprobación del INBDE y están ejerciendo la profesión legalmente en EE.UU.',
          button: 'Quiero hacer mi aplicación'
        },
        copyright: '© 2024 Brazucas no Board. Todos los derechos reservados.',
        security: {
          ssl: 'SSL Seguro',
          secure: 'Pago Seguro'
        }
      }
    },
    en: {
      header: {
        navigation: {
          about: 'About the Course',
          benefits: 'Benefits',
          testimonials: 'Testimonials',
          plans: 'Plans',
          mentor: 'Mentor',
          studentArea: 'Student Area',
          apply: 'I want to apply'
        }
      },
      hero: {
        badge: 'Open spots for training',
        title: 'The practical plan to achieve your approval in a simple and',
        subtitle: 'secure way',
        description: 'This is a validated step-by-step for dental professionals in Latin America to have a valid diploma in the United States.',
        stats: {
          students: 'Approved students',
          experience: 'Years of experience',
          method: 'Validated method'
        },
        buttons: {
          apply: 'I want to apply',
          learnMore: 'Learn more'
        }
      },
      benefits: {
        title: 'With our training, you will be able to:',
        subtitle: 'THE BENEFITS',
        items: [
          {
            title: 'Get approved on the Board on the first try',
            description: 'Validated method that increases your chances of approval on the first attempt.'
          },
          {
            title: 'Practice dentistry legally in the USA',
            description: 'Have your diploma recognized and practice your profession legally in the United States.'
          },
          {
            title: 'Return to living with quality and receiving what you deserve',
            description: 'Receive in dollars a salary compatible with the appreciation your profession deserves.'
          },
          {
            title: 'Create a name for yourself in the US health market',
            description: 'Build a solid reputation and stand out in the American dental market.'
          },
          {
            title: 'Overcome bureaucracies to be a health professional in America',
            description: 'Navigate safely through all necessary bureaucratic processes.'
          },
          {
            title: 'Be recognized in Brazil and abroad as an outstanding professional',
            description: 'Gain international recognition and become a reference in your field.'
          }
        ],
        cta: {
          title: 'Guarantee your approval and practice your dentistry to receive in dollars in the United States!',
          description: 'This is the preparatory training that will help you enter the North American market, with the ability to practice your profession safely and confidently to create a very profitable health business.',
          button: 'That\'s exactly what I want'
        }
      },
      testimonials: {
        badge: 'VALIDATED BY APPROVED DENTISTS',
        title: 'See what they say about the course:',
        items: [
          {
            text: 'The Brazucas method was fundamental for my approval. Rodrigo\'s support and the structured methodology gave me the necessary confidence to pass the board on the first try. Today I practice my profession legally in the USA!',
            name: 'Roberta Cardoso',
            title: 'Dental Surgeon',
            location: 'Miami, FL'
          },
          {
            text: 'After years trying to understand the process alone, I found in Brazucas the direction I needed. The classes are practical and focused on what really matters for the exam. I recommend it to all colleagues!',
            name: 'Patricia Medrado',
            title: 'Dentist',
            location: 'Orlando, FL'
          },
          {
            text: 'The course\'s differential is unlimited support. Whenever I had doubts, I received quick and detailed answers. This made all the difference in my preparation and INBDE approval.',
            name: 'Samantha Matos',
            title: 'Dental Surgeon',
            location: 'Houston, TX'
          },
          {
            text: 'Validated and efficient method! Rodrigo deeply knows the process and knows exactly what is necessary to be approved. Today I have my own practice in the USA thanks to Brazucas.',
            name: 'Aurora Rita',
            title: 'Dentist',
            location: 'Los Angeles, CA'
          },
          {
            text: 'The methodology is clear and objective. It doesn\'t waste time with unnecessary information, focuses on what really appears on the exam. The mock exams were essential for my preparation and confidence on exam day.',
            name: 'Déia Yamamoto',
            title: 'Dentist',
            location: 'New York, NY'
          }
        ]
      },
      pricing: {
        badge: 'THE PLANS',
        title: 'Brazucas no Board',
        subtitle: 'Choose the plan that best fits your needs and start your journey towards INBDE approval.',
        guarantee: '7-day guarantee',
        secure: 'Secure purchase',
        popular: 'MOST POPULAR',
        plan: {
          title: 'Individual',
          description: 'In this module you will have access to the course for 5 months, with online and live classes with access to mock exams and exercises.',
          price: '$950',
          period: 'value per month',
          features: [
            '2 weekly 1-hour meetings',
            '1 weekly 3-hour general group meeting (with exercise resolution)',
            '3 exam simulations',
            '1 final 3-hour intensive class on the eve of the exam (the day before)',
            'Unlimited WhatsApp support',
            'Complete educational material',
            '5-month platform access'
          ]
        },
        protection: {
          title: 'You are totally protected!',
          description: 'That\'s right, you are totally protected and investing your money in training is not a risk. Precisely because for 7 days, you have an unconditional guarantee, so you can secure your spot and if within that period you feel that the training is not for you, I will refund all your money.'
        },
        savings: {
          title: 'You save more than $1,000 by securing your spot in group or individual!',
          description: 'Investment that pays for itself with the first month of work in the USA.'
        }
      },
      mentor: {
        badge: 'A LITTLE ABOUT...',
        title: 'Who will be your mentor?',
        stats: {
          experience: '19 years of experience',
          students: '10+ approved students',
          position: 'CEO Brazucas no Board'
        },
        name: 'Rodrigo Fernandes',
        description: 'CEO of Brazucas, graduated in dentistry 19 years ago and mentor of dentists. I will help you on this study journey to validate your diploma here in the United States, so that you can enjoy the abundance of a life with happiness, appreciation and respect for being a successful professional.',
        highlight: 'I have been where you are now and I can guarantee: it\'s possible to break the barrier that prevents you from having this life you always dreamed of in this wonderful country.',
        journey: {
          title: 'My Journey',
          steps: [
            {
              title: 'Arrival in the USA',
              description: 'Like many, I started doing various jobs to support myself'
            },
            {
              title: 'Process Discovery',
              description: 'I understood that there was a way to be approved on the board'
            },
            {
              title: 'Approval and Success',
              description: 'Today I work in my profession and help others achieve the same'
            }
          ]
        }
      },
      footer: {
        brand: {
          description: 'We help dentists from Latin America validate their diplomas in the United States through a proven method and specialized support.'
        },
        links: {
          course: {
            title: 'Course',
            items: ['About INBDE', 'Methodology', 'Schedule', 'Educational Material']
          },
          support: {
            title: 'Support',
            items: ['FAQ', 'Technical Support', 'Community', 'Resources']
          },
          contact: {
            title: 'Contact',
            phone: '+1 (555) 123-4567',
            email: 'contact@brazucasnoboard.com',
            location: 'United States'
          }
        },
        cta: {
          title: 'Ready to start your journey?',
          description: 'Join the dentists who have already achieved INBDE approval and are practicing the profession legally in the USA.',
          button: 'I want to apply'
        },
        copyright: '© 2024 Brazucas no Board. All rights reserved.',
        security: {
          ssl: 'Secure SSL',
          secure: 'Secure Payment'
        }
      }
    }
  };

  constructor() {}

  setLanguage(language: string): void {
    if (this.content[language]) {
      this.currentLanguageSubject.next(language);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getContent(): LanguageContent {
    return this.content[this.getCurrentLanguage()];
  }

  getAvailableLanguages(): Array<{code: string, name: string}> {
    return [
      { code: 'pt', name: 'Português' },
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' }
    ];
  }
}

