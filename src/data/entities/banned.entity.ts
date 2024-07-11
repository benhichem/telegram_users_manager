import { Column, Entity, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class BannedUser extends BaseEntity {

  @PrimaryColumn({unique:true})
  public id!: number;

  @Column()
  public username!: string;

  @Column()
  public first_name!:string


  @Column()
  public last_name!:string
}


