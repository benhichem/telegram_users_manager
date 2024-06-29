import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';


@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  public id!: number;

  @Column({ unique: true })
  public username!: string;

  @Column()
  public first_name!: string;

  @Column()
  public last_name!: string;
}