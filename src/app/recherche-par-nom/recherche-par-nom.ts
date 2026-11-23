import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto';

@Component({ selector: 'app-recherche-par-nom', imports: [FormsModule, CommonModule], templateUrl: './recherche-par-nom.html' })
export class RechercheParNom implements OnInit {
  nomMoto = '';
  motos: Moto[] = [];

  constructor(
    private motoService: MotoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.rechercherMotos();
  }

  rechercherMotos(): void {
    this.motoService.rechercherParNom(this.nomMoto).subscribe({
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
