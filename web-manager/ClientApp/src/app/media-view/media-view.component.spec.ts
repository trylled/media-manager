import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { MediaViewComponent } from './media-view.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VgCoreModule } from "videogular2/compiled/core";
import { VgControlsModule } from "videogular2/compiled/controls";
import { VgOverlayPlayModule } from "videogular2/compiled/overlay-play";
import { VgBufferingModule } from "videogular2/compiled/buffering";
import { PdfViewerModule } from 'ng2-pdf-viewer';

describe('MediaViewComponent', () => {
  let component: MediaViewComponent;
  let fixture: ComponentFixture<MediaViewComponent>;

  function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaViewComponent
      ],
      imports: [
        HttpClientTestingModule,
        SimpleNotificationsModule.forRoot(),
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        PdfViewerModule
      ],
      providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
        NotificationsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const bannerDe: DebugElement = fixture.debugElement;
    const titleDe = fixture.debugElement.query(By.css('#tableLabel'));
    const titleElement: HTMLElement = titleDe.nativeElement;
    expect(titleElement.textContent).toEqual('Media View');
  }));

  it('should display notification on how to use skip', async(() => {
    const bannerDe: DebugElement = fixture.debugElement;
    const addQueueDe = fixture.debugElement.query(By.css('p'));
    const addQueueElement = addQueueDe.nativeElement;
    expect(addQueueElement.textContent).toEqual('When playing video, you can skip 10 seconds forward and backward using ArrowLeft and ArrowRight keys.');
  }));
});
