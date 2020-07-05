import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs'
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { ngfModule, ngf } from "angular-file"
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'lodash';

@Component({
  selector: 'media-upload',
  templateUrl: './media-upload.component.html'
})

export class MediaUploadComponent {
  private _httpClient: HttpClient;
  private _notificationsService: NotificationsService

  private accept: string = '.jpg,.mp4,.pdf';
  private fileControllerUrl: string;
  private httpEmitter: Subscription
  private httpEvent: HttpEvent<{}>
  private maxSize: any;
  private queuedFiles: File[] = [];
  private progress: number;
  private sendableFormData: FormData;

  constructor(
    httpClient: HttpClient,
    private notificationsService: NotificationsService,
    private cdRef: ChangeDetectorRef,
    @Inject('BASE_URL') baseUrl: string) {
    this._httpClient = httpClient;
    this.fileControllerUrl = baseUrl + 'file';
    this._notificationsService = notificationsService;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  public cancel(): void {
    this.progress = 0;
    if (this.httpEmitter) {
      console.log('cancelled')
      this.httpEmitter.unsubscribe()
    }
  }

  public uploadFiles(): Subscription {
    this._notificationsService.info("Upload Started", "Uploading....");
    const req = new HttpRequest<FormData>(
      'POST',
      this.fileControllerUrl,
      this.sendableFormData, {
      reportProgress: true
    })

    return this.httpEmitter = this._httpClient.request(req)
      .subscribe(
        event => {
          this.httpEvent = event

          if (event instanceof HttpResponse) {
            delete this.httpEmitter
            this.queuedFiles.length = 0;
            this.progress = 0;
            this._notificationsService.success("Success", "Upload Complete");
          }
        },
        error => this._notificationsService.error("Error", error.message)
      )
  }
}
