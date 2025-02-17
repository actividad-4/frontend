import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NewProduct, Product, ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../../components/product-modal/product-modal/product-modal.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal/delete-modal.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private modalService: NgbModal,
  ){}

  public products = signal<Product[]>([])

  async ngOnInit(): Promise<void> {
    try {
      const products = await this.productsService.getProducts();
      this.products.set([...products])
    } catch (error) {
      console.error(error)
    }
  }

  public closeSession() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  async openProductModal(options: { title: string, values?: NewProduct }): Promise<NewProduct | null> {

    const { title, values } = options
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button

    const modalRef: NgbModalRef= this.modalService.open(ProductModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    
    const modalRefInstance = modalRef.componentInstance as ProductModalComponent
    modalRefInstance.title = options.title;

    if(values) modalRefInstance.form.patchValue({ ...values });

    const modalResult: NewProduct | null = await modalRef.result

    return modalResult
      ? modalResult
      : null
  }

  async openDeleteModal(): Promise<boolean> {

    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button

    const modalRef: NgbModalRef= this.modalService.open(DeleteModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    
    const modalRefInstance = modalRef.componentInstance as DeleteModalComponent

    modalRefInstance.title.set('Eliminar producto');
    modalRefInstance.message.set('¿Estás seguro que quieres eliminar este producto?');

    const modalResult: boolean = await modalRef.result

    return modalResult
  }

  async createProduct() {
    try {
      const createProduct = await this.openProductModal({ title: 'Crear producto'});

      if(createProduct) {
        await this.productsService.createProduct(createProduct);
        const products = await this.productsService.getProducts();
        this.products.set([...products])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateProduct(id: string, itemValues: Product) {
    const { description, name, price } = itemValues;

    try {
      const updateProduct = await this.openProductModal({ title: 'Editar producto', values: { description, name, price }});
      
      if(updateProduct) {
        await this.productsService.updateProduct({ id, updateProduct });
        const products = await this.productsService.getProducts();
        this.products.set([...products])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteProduct(id: string) {
    try {
      const deleteProduct: boolean = await this.openDeleteModal();

      if(deleteProduct) {
        await this.productsService.deleteProduct(id);
        const products = await this.productsService.getProducts();
        this.products.set([...products])
      }
    } catch (error) {
      console.error(error)
    }
  }
}