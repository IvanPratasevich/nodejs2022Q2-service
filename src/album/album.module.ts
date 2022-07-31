import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [forwardRef(() => TrackModule)],
})
export class AlbumModule {}
