import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { CommonModule } from '@angular/common';
import { MotoService } from '../services/moto';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({ selector: 'app-motos', imports: [CommonModule, RouterLink], templateUrl: './motos.html' })
export class Motos implements OnInit {
  motos: Moto[] = [];
  erreur = '';

  constructor(
    private motoService: MotoService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerMotos();
  }

  chargerMotos(): void {
    this.motoService.listeMotos().subscribe({
      next: (data) => {
        this.motos = data;
        this.erreur = '';
        this.cdr.markForCheck(); // Angular 21 sans zone.js : il faut demander le rafraîchissement
      },
      error: () => {
        this.erreur = 'Impossible de charger les motos. Vérifiez le Backend.';
        this.cdr.markForCheck();
      },
    });
  }

  deleteMoto(moto: Moto): void {
    if (confirm('Etes-vous sûr ?') && moto.idMoto != null) {
      this.motoService.supprimerMoto(moto).subscribe({
        next: () => this.chargerMotos(),
        error: () => alert('Erreur lors de la suppression.'),
      });
    }
  }
}
