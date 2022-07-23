import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
