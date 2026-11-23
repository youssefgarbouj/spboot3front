import { Categorie } from './../model/categorie.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto';
import { Router } from '@angular/router';

@Component({ selector: 'app-add-moto', imports: [CommonModule, FormsModule], templateUrl: './add-moto.html' })
export class AddMoto implements OnInit {
  newMoto = new Moto();
  message = '';
  categories: Categorie[] = [];
  newidCat!: number;

  constructor(
    private motoService: MotoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.motoService.listeCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.newidCat = data[0]?.idEngine;
        this.cdr.markForCheck();
      },
      error: () => {
        this.message = 'Impossible de charger les catégories.';
        this.cdr.markForCheck();
      },
    });
  }

  addMoto(): void {
    const cat = this.categories.find((c) => c.idEngine === Number(this.newidCat));
    if (!cat) {
      this.message = 'Choisissez une catégorie.';
      return;
    }
    this.newMoto.enginePower = cat;
    this.newMoto.idMoto = undefined;
    this.motoService.ajouterMoto(this.newMoto).subscribe({
      next: () => this.router.navigate(['motos']),
      error: () => {
        this.message = 'Erreur : moto non ajoutée.';
        this.cdr.markForCheck();
      },
    });
  }
}
