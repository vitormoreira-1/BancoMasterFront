import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Defina a interface do modelo de dados
export interface RouteItem {
  id: number;
  origin: string;
  destination: string;
  value: number;
}

export interface CalculateResult {
  path: string [];
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiUrl = 'http://localhost:4176/api/route';

  constructor(private http: HttpClient) { }

  // Criar um novo item
  createItem(item: RouteItem): Observable<RouteItem> {
    return this.http.post<RouteItem>(this.apiUrl, item, this.httpOptions())
      .pipe(catchError(this.handleError<RouteItem>('')));
  }

  // Obter todos os itens
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError<RouteItem[]>('', [])));
  }

  // Deletar um item
  deleteItem(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError<{}>('')));
  }

  // Calcular
  calculate(origin: string, destination: string): Observable<CalculateResult> {
    return this.http.get<CalculateResult>(`${this.apiUrl}/${origin}/${destination}`, this.httpOptions())
      .pipe(catchError(this.handleError<CalculateResult>('')));
  }

  // Configurações comuns para as requisições HTTP (headers)
  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // Função para tratar erros de requisição
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
