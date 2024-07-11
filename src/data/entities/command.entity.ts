import { Column, Entity, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Commands extends BaseEntity {

  @PrimaryColumn({generated:true})
  public id!: number;

  @Column({ unique: true })
  public username!: string;

  @Column({})
  public command!: string;

  @CreateDateColumn()
  public created_at!:string
}