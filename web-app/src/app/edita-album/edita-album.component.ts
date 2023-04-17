import { Component } from '@angular/core';
import { Musica } from '../musicas/musica';
import { Album } from '../album/album';
import { ActivatedRoute } from '@angular/router';
import { MusicaService } from '../musicas/musicas.service';
import { HttpClient } from '@angular/common/http';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edita-album',
  templateUrl: './edita-album.component.html',
  styleUrls: ['./edita-album.component.css']
})
export class EditaAlbumComponent {
  id: number = 0;
  musicas: Musica[] = [];
  album: Album = new Album;

  private taURL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private musicaService: MusicaService,
    private http: HttpClient,
    private albumService: CadastraAlbumService,
    private toastr: ToastrService
  ) {}


  ngOnInit() {
    this.id = + this.route.snapshot.params['id'];
    this.albumService.getAlbumById(this.id).subscribe(album => {
      this.album = album
    })
    this.musicaService.getMusicasByAlbum(String(this.album.id)).subscribe(musicas => {
      this.musicas = musicas;
    });
  }

  editarAlbum(album: Album) {
    const novoTitulo = (<HTMLInputElement>document.getElementById("album-nome")).value;
    const novoAlbum = (<HTMLInputElement>document.getElementById("album-url_foto_album")).value;
    const novoAno = (<HTMLInputElement>document.getElementById("album-ano_lancamento")).value;
    
    if(
      novoTitulo == "" ||
      novoAlbum == "" ||
      novoAno == ""
    ){
      this.toastr.error('Campo inválido!');
      return;
    }

    // Requisição PUT para atualizar o álbum
    this.http.put(this.taURL + "/albums/" + String(album.id), {
      nome: novoTitulo || album.nome,
      artistaId: album.artistaId,
      url_foto_album: novoAlbum || album.url_foto_album,
      artistaNome: album.artistaNome,
      ano_lancamento: novoAno || album.ano_lancamento
    }).subscribe(() => {
      console.log('Álbum atualizado com sucesso!');
      this.toastr.success('Álbum alterado!');

      // Requisição GET para buscar todas as músicas do álbum
      this.http.get<any>(this.taURL + "/musicas/?albumId=" + String(album.id))
        .subscribe((musicas: Musica[]) => {
          // Atualização do título do álbum em cada música
          musicas.forEach((musica: Musica) => {
            this.http.put(this.taURL + "/musicas/" + String(musica.id), {
              titulo: musica.titulo,
              albumId: musica.albumId,
              artistaId: musica.artistaId,
              capaAlbum: musica.capaAlbum,
              artistaNome: musica.artistaNome,
              tituloAlbum: novoTitulo
            }).subscribe(() => {
              console.log('Título da música atualizado com sucesso!');
            }, (error) => {
              console.error('Ocorreu um erro ao atualizar o título da música:', error);
            });
          });
          
          setTimeout(() =>{
            // Redirecionamento para a página de detalhes do álbum
            window.location.href = "/visualizar-artistas-admin";
          }, 2000);
        }, (error) => {
          console.error('Ocorreu um erro ao buscar as músicas do álbum:', error);
        });
    }, (error) => {
      console.error('Ocorreu um erro ao atualizar o álbum:', error);
    });
  }  

  cancelEditarAlbum() {
    window.history.back();
  }
}
