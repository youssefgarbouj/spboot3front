import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';

@Component({ selector: 'app-update-categorie', imports: [FormsModule], templateUrl: './update-categorie.html' })
export class UpdateCategorie {
  @Input() categorie!: Categorie;
  @Input() ajout!: boolean;
  @Output() categorieUpdated = new EventEmitter<Categorie>();
  saveCategorie(): void { this.categorieUpdated.emit(this.categorie); }
}
