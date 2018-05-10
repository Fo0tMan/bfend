import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Options, BFEND_OPTIONS } from '../options.type';

export interface UploadResult {
  size: number;
  originame: number;
  name: string;
  url: string;
}

@Injectable()
export class UploadService {
  url = `${this.options.api_base_uri}/upload`;

  constructor(private httpClient: HttpClient, @Inject(BFEND_OPTIONS) private options: Options) {}

  post(files: { [key: string]: File }, url = this.url): Observable<UploadResult> {
    const formData = new FormData();

    for (const k of Object.keys(files)) {
      formData.append(k, files[k]);
    }

    return this.httpClient.post<UploadResult>(url, formData);
  }
}
