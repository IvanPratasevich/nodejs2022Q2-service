import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  tracks: string[];
}
