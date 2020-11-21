import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'dbExemplo_exemplo' })
export class Exemplo extends AbstractEntity {
    @Column({ length: 60 })
    nome: string;

    // Exemplo realacionamento 1:n
    // @ManyToOne( () => Exemplo2, { cascade: true })
    // @JoinColumn({ name: 'id_exemplo2' })
    // exemplo2: Exemplo2;
}
