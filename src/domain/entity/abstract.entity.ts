import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'dt_criacao' })
  public dtCriacao?: Date;

  @Column({ name: 'usuario_criacao' })
  public usuarioCriacao: number;

}
