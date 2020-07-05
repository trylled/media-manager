import { ChangeDetectorRef, Component, Inject, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs'
import { HttpClient, HttpEvent } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'lodash';
import { VgAPI } from 'videogular2/compiled/core';

interface Media extends Selection {
  createdTimeStamp: string;
  fileName: string;
  id: string;
  name: string;
  type: string;
  url: string;
}

interface Selection {
  isSelected: boolean
}

@Component({
  selector: 'media-view',
  templateUrl: './media-view.component.html'
})

export class MediaViewComponent {
  private _httpClient: HttpClient;
  private _keyEventListener: Function;
  private _notificationsService: NotificationsService
  private _renderer: Renderer2

  private fileControllerUrl: string;
  private isFetching: boolean;
  private uploadedMedia: Media[];
  private uploadFolder: string;
  private videoAPI: VgAPI;

  constructor(
    httpClient: HttpClient,
    private notificationsService: NotificationsService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject('BASE_URL') baseUrl: string) {
    this._httpClient = httpClient;
    this._notificationsService = notificationsService;
    this._renderer = renderer;
    this.fileControllerUrl = baseUrl + 'file';
    this.uploadFolder = baseUrl + 'uploads/';
    this.fetchFiles();

    this._keyEventListener = this._renderer.listen('document', 'keydown', (event) => {
      if (!this.videoAPI) return;
      switch (event.key) {
        case 'ArrowLeft':
          this.videoAPI.currentTime -= 10;
          break;
        case 'ArrowRight':
          this.videoAPI.currentTime += 10;
          break;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  public fetchFiles(): void {
    this.isFetching = true;
    this._notificationsService.info("Fetching Media", "Loading.....");
    this._httpClient.get<Media[]>(this.fileControllerUrl).subscribe(result => {
      this.uploadedMedia = _.map(result, (r: Media) => {
        r.url = this.uploadFolder + r.fileName;
        return r;
      });
      this.isFetching = false;
      this._notificationsService.info("Media Ready", "Media ready.");
    }, error => this._notificationsService.error("Error", error.message));
  }

  public fileClick(id: string, isSelected: boolean): void {
    _.each(this.uploadedMedia, (m: Media) => {
      m.isSelected = m.id === id ? isSelected : false;
    })
  }
}
