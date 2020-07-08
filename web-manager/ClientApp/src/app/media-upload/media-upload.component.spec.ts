import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ngfModule, ngf } from "angular-file"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { MediaUploadComponent } from './media-upload.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;

  function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaUploadComponent
      ],
      imports: [
        HttpClientTestingModule,
        ngfModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
        NotificationsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const bannerDe: DebugElement = fixture.debugElement;
    const titleDe = fixture.debugElement.query(By.css('#tableLabel'));
    const titleElement: HTMLElement = titleDe.nativeElement;
    expect(titleElement.textContent).toEqual('Media Upload');
  }));

  it('should display "Add Queue" button', async(() => {
    const bannerDe: DebugElement = fixture.debugElement;
    const addQueueDe = fixture.debugElement.query(By.css('#addQueue'));
    const addQueueElement = addQueueDe.nativeElement;
    expect(addQueueElement.outerText).toEqual('Add Queue');
  }));
});
