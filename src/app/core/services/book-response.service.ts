import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO} from "../interfaces/category.dto";
import { ExchangegoDTO} from "../interfaces/exchangego.dto";
import {environment} from "../../../environments/environment.dev";
import {BookNoteResponseDTO} from "../interfaces/book-note-response.dto";

@Injectable({
  providedIn: 'root'
})

export class BookResponseService {
  private apiUrl = environment.BASE_URL+'/book/response/literary/';
  private apiUrlCreate = `${environment.BASE_URL}/book/response/create`;

  constructor(private http: HttpClient) { }

  GetBookInfo(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.apiUrl}/${id}`);
  }
  CreateResponse(resp: BookNoteResponseDTO): Observable<BookNoteResponseDTO> {
    return this.http.post<BookNoteResponseDTO>(this.apiUrlCreate, resp);
  }

}


