import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./upload-video/UploadVideoResponse";
import {VideoDto} from "./VideoDto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  uploadVideoResponse: UploadVideoResponse | undefined;

  constructor(private httpClient: HttpClient) {
  }

  public uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);

    //Http post call to upload the video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos/upload", formData);
  }

  public getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/videos/" + videoId);
  }

  public saveVideo(videoMetData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/video/", videoMetData, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos/", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  likeVideo(videoId: string | ""): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/" + videoId + "/like", null, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  dislikeVideo(videoId: string | "") {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/" + videoId + "/dislike", null, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  getSuggestedVideos(userId: string | ""): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos/suggested/" + userId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  uploadThumbnail(selectedFile: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    formData.append('videoId', videoId);
    return this.httpClient.post('http://localhost:8080/api/videos/thumbnail/upload', formData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        responseType: 'text'
      });
  }

}
