import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';


@Entity()
export class User extends BaseEntity {

  @PrimaryColumn({unique:true})
  public id!: number;

  @Column()
  public username!: string;

  @Column()
  public first_name!: string;

  @Column()
  public last_name!: string;
}