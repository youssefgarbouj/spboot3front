import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../model/moto.model';
import { Categorie } from '../model/categorie.model';
import { MotoService } from '../services/moto';

@Component({ selector: 'app-recherche-par-categorie', imports: [CommonModule], templateUrl: './recherche-par-categorie.html' })
export class RechercheParCategorie implements OnInit {
  categories: Categorie[] = [];
  motos: Moto[] = [];
  idcat: number | null = null;

  constructor(
    private motoService: MotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.motoService.listeCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.idcat = cats[0]?.idEngine ?? null;
        this.cdr.markForCheck();
        if (this.idcat !== null) this.chargerMotos(this.idcat);
      },
    });
  }

  onChange(id: string): void {
    this.idcat = Number(id);
    this.chargerMotos(this.idcat);
  }

  chargerMotos(id: number): void {
    this.motoService.rechercherParCategorie(id).subscribe({
      next: (data) => {
        this.motos = data;
        this.cdr.markForCheck();
      },
      error: () => {
        this.motos = [];
        this.cdr.markForCheck();
      },
    });
  }
}
