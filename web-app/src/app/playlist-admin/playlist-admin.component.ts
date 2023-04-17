import { Component } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from './playlist';
import { ResultadoPesquisaService } from '../resultados-pesquisa/resultado-pesquisa.service';
import { Musica } from '../musicas/musica';
import { MusicaService } from '../musicas/musicas.service';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist-admin',
  templateUrl: './playlist-admin.component.html',
  styleUrls: ['./playlist-admin.component.css']
})
export class PlaylistAdminComponent {
  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router, private resultados: ResultadoPesquisaService, private service: AuthService, private http: HttpClient){
    this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
      this.user = res;
    });


  }

  private taURL = 'http://localhost:3000';
  seguir = true;
  user: any;
  id:number = 0;
  playlist: Playlist = new Playlist()
  musicas: Musica[] = []
  isDonoPlaylist = false

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.playlistService.getPlaylistById(String(this.id)).subscribe((playlist) => {
      this.playlist = playlist;
      this.musicas = this.playlist.musicas
      this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
        this.isDonoPlaylist = JSON.stringify(playlist.usuario_dono) === JSON.stringify(res)
        this.user = res
      });
      
      if (this.playlist.seguidores.find(u => u.id === this.user.id)) {
        this.seguir = false;
      } else {
        this.seguir = true;
      }
    })
  };

  editarPlaylist(playlistId: number) {
    this.router.navigate(['editar-playlist', playlistId]);
  }

  deletePlaylist(playlistId: number) {
    this.playlistService.deletePlaylist(String(playlistId))
  }

  pesquisar(){
    this.resultados.pesquisar()
  }

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  removerMusicaPlaylist(playlistId: number, musicaId: number){
    this.playlistService.deletaMusicaPlaylist(playlistId, musicaId)
    window.location.reload()
  }

  editarMusica(id: number): void {
    this.router.navigate(['editar-musica', id]);
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }

  seguirPlaylist() {
    if (this.seguir) {
      this.playlistService.getPlaylistById(String(this.id)).subscribe((playlist) => {
        this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
          console.log(res)
          const newPlaylists = {
            id: playlist.id,
            titulo: playlist.titulo,
            privacidade: playlist.privacidade,
            categoria: playlist.categoria,
            url_foto_playlist: playlist.url_foto_playlist,
            usuario_dono: playlist.usuario_dono,
            musicas: playlist.musicas,
            seguidores: [...playlist.seguidores, res]
          };

          this.http.put(this.taURL + "/playlists/" + String(this.id), newPlaylists).subscribe(() => {
            console.log('Playlist atualizada com sucesso!');
          })
        })
      });
    } else {
      this.playlistService.getPlaylistById(String(this.id)).subscribe((playlist) => {
        const newPlaylists = {
          id: playlist.id,
          titulo: playlist.titulo,
          privacidade: playlist.privacidade,
          categoria: playlist.categoria,
          url_foto_playlist: playlist.url_foto_playlist,
          usuario_dono: playlist.usuario_dono,
          musicas: playlist.musicas,
          seguidores: playlist.seguidores.filter(m => m.id !== this.user.id)
        };

        this.http.put(this.taURL + "/playlists/" + String(this.id), newPlaylists).subscribe(() => {
          console.log('Playlist atualizada com sucesso!');
        })
      });
    }
  }

  toggleSeguir() {
    this.seguirPlaylist()
    this.seguir = !this.seguir;
  }

  handleClick() {
    const tempElement = document.createElement('textarea');
    tempElement.value = window.location.href;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
  }
  
}