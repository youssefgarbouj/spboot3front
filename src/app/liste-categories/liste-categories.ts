import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { MotoService } from '../services/moto';
import { UpdateCategorie } from '../update-categorie/update-categorie';

@Component({ selector: 'app-liste-categories', imports: [CommonModule, UpdateCategorie], templateUrl: './liste-categories.html' })
export class ListeCategories implements OnInit {
  categories: Categorie[] = [];
  updatedCat: Categorie = { idEngine: 0, nomEngine: '' };
  ajout = true;

  constructor(
    private motoService: MotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories(): void {
    this.motoService.listeCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.markForCheck();
      },
      error: () => alert('Impossible de charger les catégories.'),
    });
  }

  categorieUpdated(cat: Categorie): void {
    const action = this.ajout ? this.motoService.ajouterCategorie(cat) : this.motoService.updateCategorie(cat);
    action.subscribe({
      next: () => {
        this.updatedCat = { idEngine: 0, nomEngine: '' };
        this.ajout = true;
        this.chargerCategories();
      },
      error: () => alert('Erreur : vérifiez le nom de la catégorie.'),
    });
  }

  updateCat(cat: Categorie): void {
    this.updatedCat = { ...cat };
    this.ajout = false;
  }
}
