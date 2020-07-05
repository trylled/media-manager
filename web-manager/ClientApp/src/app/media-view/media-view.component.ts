import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs'
import { HttpClient, HttpEvent } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'lodash';

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
  private _notificationsService: NotificationsService

  private fileControllerUrl: string;
  private uploadedMedia: Media[];
  private uploadFolder: string;
  private isFetching: boolean;

  constructor(
    httpClient: HttpClient,
    private notificationsService: NotificationsService,
    private cdRef: ChangeDetectorRef,
    @Inject('BASE_URL') baseUrl: string) {
    this._httpClient = httpClient;
    this._notificationsService = notificationsService;
    this.fileControllerUrl = baseUrl + 'file';
    this.uploadFolder = baseUrl + 'uploads/';
    this.fetchFiles();
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
}
