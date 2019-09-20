import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  it(
    'should get video list',
    inject(
      [HttpTestingController, DataService],
      (
        httpMock: HttpTestingController,
        dataService: DataService
      ) => {
        const apiUrl = environment.apiUrl;
        const dataUri = '/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';
        const mockData = [
          {
            thumbnails: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
            title: 'Lil Wayne - John (Explicit) ft. Rick Ross',
            description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
            published: '2011-05-12T20:01:31.000Z',
            url: 'https://www.youtube.com/watch?v=',
          }
        ];

        dataService.fetchData().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockData);
          }
        });

        const mockReq = httpMock.expectOne(apiUrl + dataUri);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockData);

        httpMock.verify();
      }
    )
  );
});
