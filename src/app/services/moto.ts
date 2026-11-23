import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moto } from '../model/moto.model';
import { Categorie } from '../model/categorie.model';

@Injectable({ providedIn: 'root' })
export class MotoService {
  private apiUrl = 'http://localhost:8080/motos/api';
  private engineUrl = 'http://localhost:8080/motos/api/engines';

  constructor(private http: HttpClient) {}

  listeMotos(): Observable<Moto[]> { return this.http.get<Moto[]>(this.apiUrl); }
  consulterMoto(id: number): Observable<Moto> { return this.http.get<Moto>(`${this.apiUrl}/${id}`); }
  ajouterMoto(moto: Moto): Observable<Moto> { return this.http.post<Moto>(this.apiUrl, this.preparerMoto(moto)); }
  updateMoto(moto: Moto): Observable<Moto> { return this.http.put<Moto>(this.apiUrl, this.preparerMoto(moto)); }
  supprimerMoto(moto: Moto): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${moto.idMoto}`); }

  listeCategories(): Observable<Categorie[]> { return this.http.get<Categorie[]>(this.engineUrl); }
  consulterCategorie(id: number): Observable<Categorie> { return this.http.get<Categorie>(`${this.engineUrl}/${id}`); }
  ajouterCategorie(cat: Categorie): Observable<Categorie> { return this.http.post<Categorie>(this.engineUrl, cat); }
  updateCategorie(cat: Categorie): Observable<Categorie> { return this.http.put<Categorie>(this.engineUrl, cat); }
  supprimerCategorie(id: number): Observable<void> { return this.http.delete<void>(`${this.engineUrl}/${id}`); }

  rechercherParCategorie(id: number): Observable<Moto[]> { return this.http.get<Moto[]>(`${this.apiUrl}/motosengine/${id}`); }
  rechercherParNom(nom: string): Observable<Moto[]> { return this.http.get<Moto[]>(`${this.apiUrl}/recherche?nom=${encodeURIComponent(nom)}`); }

  private preparerMoto(moto: Moto): any {
    return {
      idMoto: moto.idMoto,
      marqueMoto: moto.marqueMoto,
      modeleMoto: moto.modeleMoto,
      prixMoto: moto.prixMoto,
      dateFabrication: moto.dateFabrication,
      enginePower: moto.enginePower ? { idEngine: moto.enginePower.idEngine } : null
    };
  }
}
