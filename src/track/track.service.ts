import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/interfaces/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';
const tracks: Track[] = [];

@Injectable()
export class TrackService {
  getTracks() {
    return tracks;
  }
  getTrackById(id: string): Track {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  checkTrackById(id: string): Track {
    const track = tracks.find((track) => track.id === id);
    return track;
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    tracks.push(newTrack);
    return newTrack;
  }
  updateTrack(UpdateTrackDto: UpdateTrackDto, id: string) {
    const track = this.getTrackById(id);
    const trackIdx = this.getTrackIdx(id);
    if (!track) {
      throw new NotFoundException('Track not found!');
    }
    const updateTrack = {
      ...track,
      ...UpdateTrackDto,
    };
    tracks[trackIdx] = updateTrack;
    return updateTrack;
  }

  getTrackIdx(id: string): number {
    const trackIdx = tracks.findIndex((artist) => id === artist.id);
    if (trackIdx != -1) {
      return trackIdx;
    }
    throw new NotFoundException('Track not found');
  }

  deleteTrack(id: string) {
    const user = this.getTrackIdx(id);
    tracks.splice(user, 1);
  }

  deleteAlbum(id) {
    tracks.map((track) => {
      if (id === track.albumId) {
        track.albumId = null;
      }
    });
  }

  deleteArtist(id) {
    tracks.map((track) => {
      if (id === track.artistId) {
        track.artistId = null;
      }
    });
  }
}
