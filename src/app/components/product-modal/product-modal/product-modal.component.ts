import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface ProductForm {
  description :FormControl<string | null>
  name        :FormControl<string | null>, 
  price       :FormControl<number | null>, 
}

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})

export class ProductModalComponent {

  constructor(private modal: NgbActiveModal) {}

  title: string = 'Crear producto'

  public form: FormGroup<ProductForm>= new FormGroup<ProductForm>({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.nullValidator]),
    description: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if(this.form.invalid) return

    const formValue = this.form.value
    this.modal.close({...formValue})
  }

  close() {
    this.modal.close(null);
  }
}