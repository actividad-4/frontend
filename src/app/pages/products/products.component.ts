import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(
    private router: Router
  ){}

  public closeSession() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}