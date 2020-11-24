import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'example' })
export class Example extends AbstractEntity {
    @Column({ length: 60 })
    name: string;

    // Example 1:n
    // @ManyToOne( () => Example2, { cascade: true })
    // @JoinColumn({ name: 'id_example2' })
    // example2: Example2;
}
