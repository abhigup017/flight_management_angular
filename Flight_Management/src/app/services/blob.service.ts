import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/blob";

  UploadFile(fileToUpload:File)
  {
    const formData:FormData = new FormData();
    formData.append('blob', fileToUpload, fileToUpload.name);
    return this.http.post(this._baseUrl, formData);
  }

  GenerateBookingPdf(request:any)
  {
    return this.http.post(this._baseUrl + "/generatepdf", request);
  }
}
