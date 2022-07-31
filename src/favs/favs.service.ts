import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesRepsonse } from 'src/interfaces/interfaces';

const db = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAll(): FavoritesRepsonse {
    const favoritesRepsonse = {
      albums: [],
      artists: [],
      tracks: [],
    };
    db.albums.forEach((album) => {
      const findAlbum = this.albumService.checkAlbumById(album);
      if (findAlbum) favoritesRepsonse.albums.push(findAlbum);
    });
    db.tracks.forEach((track) => {
      const findTrack = this.trackService.checkTrackById(track);
      if (findTrack) favoritesRepsonse.tracks.push(findTrack);
    });
    db.artists.forEach((artist) => {
      const findArtist = this.artistService.checkArtistById(artist);
      if (findArtist) favoritesRepsonse.artists.push(findArtist);
    });
    return favoritesRepsonse;
  }

  addTrackToFavs(id: string) {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      db.tracks.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  deleteTrackFromFavs(id: string) {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      db.tracks = db.tracks.filter((track) => {
        return track !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addAlbumToFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      db.albums.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteAlbumFromFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      db.albums = db.albums.filter((album) => {
        return album !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addArtistToFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      db.artists.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteArtistFromFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      db.artists = db.artists.filter((artist) => {
        return artist !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }

  deleteAlbum(id) {
    const albumIdx = db.albums.findIndex((album) => id === album.id);
    if (albumIdx !== -1) {
      return albumIdx;
    }
  }
}
