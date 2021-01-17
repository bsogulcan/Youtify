import { SuccessComponent } from './../success/success.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatePlaylist } from 'src/app/models/CreatePlaylist';
import { Youtube } from 'src/app/models/Youtube';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = "";
  videos: Youtube | undefined;
  spotifyCode: string | undefined;
  likedVideosTitle = new Array<String>();
  creatingPlaylist: boolean = false;


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.title = 'angular';
    debugger;
    this.spotifyCode = this.route.snapshot.queryParamMap.get('code')?.toString();
  }

  getLikedVideos() {
    this.http.get<any>('https://localhost:44373/api/Youtube').subscribe(data => {
      this.videos = Youtube.fromJS(data);
      debugger;
      for (let video of this.videos!.items!) {
        this.likedVideosTitle.push(video.snippet!.title!);
      }

      console.log(this.videos);
    })
  }

  getPlaylists() {
    window.location.href = "https://accounts.spotify.com/authorize?client_id=5176332b04a34d7a8859dff657d968d6&response_type=code&redirect_uri=http%3a%2f%2flocalhost%3a4200%2fhome%2f&scope=playlist-read-private+playlist-read-collaborative+playlist-modify-private+playlist-modify-public&show_dialog=True";
  }

  createPlaylist() {

    this.creatingPlaylist = true;
    var createPaylist = new CreatePlaylist();
    createPaylist.code = this.spotifyCode;
    createPaylist.likedVideos = this.likedVideosTitle;

    const content_ = JSON.stringify(createPaylist);
    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
        "Accept": "text/plain"
      })
    };


    this.http.request("post", "https://localhost:44373/api/Spotify/CreatePlaylistAsync", options_)
      .toPromise()
      .then(response => {
        console.log(response);
        this.creatingPlaylist = false;

        this.dialog.open(SuccessComponent);


      })
      .catch(console.log);

  }

}
