import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
    name: string;
    text: string;
    img: string;
}

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.html',
    styleUrls: ['./about.scss']
})
export class AboutComponent {
    cards: Card[] = [
        {
            name: 'Professora Ana Paula Moreira',
            text:
                'Sou cirurgiã-dentista há 20 anos, especialista em Odontopediatria e Ortodontia. ' +
                'No dia 03/01/2024 conquistei meu PASS, e hoje tenho muito orgulho em fazer parte da Equipe Brazucas de Professores, ' +
                'ajudando outros colegas a também alcançarem esse objetivo tão importante.\n\n' +
                'Além da Odontologia, sou apaixonada pela minha família: sou mãe do Lucas e do Davi, ' +
                'casada e completamente apaixonada por gatos! 🐱\n\n' +
                'Minha missão? Colaborar com a jornada rumo ao PASS de cada um dos nossos alunos! Conte comigo para o que precisar!',
            img: 'assets/img/foto1.jpeg'
        },
        {
            name: 'Professor Felipe Wildberger',
            text:
                '- INBDE PASS - American Dental Association\n' +
                '- Bacharel em Odontologia\n' +
                '- Professor da Graduação / Pós-Graduação / Especialização\n' +
                '- Especialista em Prótese Dentária\n' +
                '- Residência em Implantodontia\n' +
                '- Professor do Curso de Cirurgia Guiada em Implantodontia\n' +
                '- Professor do Curso de Laminados Cerâmicos - Veneers By Side\n' +
                '- Residencia em Laminados Cerâmicos com Victor Clavijo e Fábio Fujyi\n' +
                '- Diversos outros cursos da área de odontologia, fotografia e gestão.',
            img: 'assets/img/foto2.jpeg'
        },
        {
            name: 'Professor e Consultor de vendas Pedro Queiroz',
            text:
                'Cirurgião dentista formado em 2011\n\n' +
                'Especialista em Ortondontia e ortopedia facial pela UNESP\n\n' +
                'Aprovado no INBDE dental Board\n\n' +
                'Expert em tratamento com alinhadores ortodônticos Invisalign com mais de 1000 casos tratados\n\n' +
                'Monitor das turmas de reta final do Brazucas no Board\n\n' +
                'Consultor de vendas Brazucas no Board',
            img: 'assets/img/foto3.jpeg'
        },
        {
            name: 'Professora Priscila Batista',
            text:
                'Me chamo Priscila Batista, sou cirurgiã dentista formada pela UFRJ, carioca, mãe de pet e que ama aprender coisas novas. ' +
                'Desde 2023, moro nos Estados Unidos em NYC e estou no processo de validação do diploma. ' +
                'O meu objetivo é oferecer a melhor experiência e apoio para alunos durante essa jornada desafiadora de revalidação e juntos conquistar o sonhado PASS no board.',
            img: 'assets/img/foto4.jpeg'
        },
        {
            name: 'Professor e Coordenador pedagógico Jonas Gusmão',
            text:
                '• Nome completo: Jonas Nogueira Ferreira Maciel Gusmão\n' +
                '• Mini currículo:\n' +
                '* Cirurgião Bucomaxilofacial\n' +
                '* Doutorando em Patologia - UFC\n' +
                '* Mestre em Ciências Morfofuncionais - UFC\n' +
                '* Pós-graduado em Implantodontia - ABO\n' +
                '* Editor-Chefe | Brazilian Journal of Dentistry Oral Radiology (BJDOR)\n' +
                '* Diretor Educacional | Bazucas on Board curso preparatório do INBDE\n' +
                '* Aprovado no INBDE (Integrated National Board Dental Examination, EUA)\n' +
                '* Em processo de revalidação odontológica nos EUA',
            img: 'assets/img/foto5.jpeg'
        },
        { name: 'Gabriela Fernandes - Setor de Contratos', text: '', img: 'assets/img/foto6.jpeg' },
        {
            name: 'Ilma',
            text:
                'Administradora desde 2004, sempre trabalhei na área administrativa com experiência em 2 multinacionais. ' +
                'Morando no RJ - BR. Com ampla experiência em atendimento e resolução de questões que melhor se adequem ao aluno.',
            img: 'assets/img/foto7.jpeg'
        },
        {
            name: 'Dr. Luis Aurélio Camargo',
            text:
                'Dentista formado pela Universidade Federal de Alfenas em 1998. Há 26 anos atua em consultório particular no Brasil. ' +
                'Mestre e especialista em implantes dentários e especialista em Periodontia. Em abril de 2023, foi aprovado no INBDE e desde então ' +
                'passou a fazer parte da equipe Brazucas, ministrando aulas de estatística, síndromes e anestésicos.',
            img: 'assets/img/foto8.jpeg'
        },
        {
            name: 'Dr. Daniel Domingues dos Santos Junior',
            text: '- Especialista em prótese dentária\n- Mestrando em odontologia',
            img: 'assets/img/foto9.jpeg'
        }
    ];

    selectedCard: Card | null = null;

    openModal(card: Card): void {
        this.selectedCard = card;
    }

    closeModal(): void {
        this.selectedCard = null;
    }

    trackByIndex = (_: number, __: Card): number => _;
}
