import { Component, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  constructor(private modal: NgbActiveModal){}

  title = signal<string>('Eliminar')
  message = signal<string>('¿Estás seguro que deseas eliminar?')

  close(willDelete: boolean): void {
    this.modal.close(willDelete)
  }
}