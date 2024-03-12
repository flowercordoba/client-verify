// src/app/services/gestion.service.ts

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionesRespuesta } from '../interfaces/gestion.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
    private apiUrl = `${environment.apiBaseUrl}/gestion`; 

  constructor(private http: HttpClient) {}

  getGestiones(): Observable<GestionesRespuesta> {
    return this.http.get<GestionesRespuesta>(`${this.apiUrl}/read-all`);
  }
//   return this.http.get<UserResponse>(`${this.apiUrl}/read-all`);
}
