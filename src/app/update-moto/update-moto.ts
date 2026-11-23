import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MotoService } from '../services/moto';
import { ActivatedRoute, Router } from '@angular/router';
import { Moto } from '../model/moto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';

@Component({ selector: 'app-update-moto', imports: [FormsModule, CommonModule], templateUrl: './update-moto.html' })
export class UpdateMoto implements OnInit {
  currentMoto = new Moto();
  categories: Categorie[] = [];
  updatedcatid!: number;
  erreur = '';

  constructor(
    private motoService: MotoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.motoService.listeCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.currentMoto.enginePower) this.updatedcatid = this.currentMoto.enginePower.idEngine;
        else this.updatedcatid = data[0]?.idEngine;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Erreur chargement catégories.';
        this.cdr.markForCheck();
      },
    });
    this.motoService.consulterMoto(id).subscribe({
      next: (moto) => {
        this.currentMoto = moto;
        this.updatedcatid = moto.enginePower?.idEngine ?? this.categories[0]?.idEngine;
        this.cdr.markForCheck();
      },
      error: () => {
        this.erreur = 'Moto introuvable.';
        this.cdr.markForCheck();
      },
    });
  }

  updateMoto(): void {
    this.currentMoto.enginePower = this.categories.find((c) => c.idEngine === Number(this.updatedcatid));
    this.motoService.updateMoto(this.currentMoto).subscribe({
      next: () => this.router.navigate(['motos']),
      error: () => {
        this.erreur = 'Erreur lors de la modification.';
        this.cdr.markForCheck();
      },
    });
  }
}
