import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    localStorage.removeItem('token')
  }
  
  form: FormGroup<{ email:FormControl<string | null>, name:FormControl<string | null>, password:FormControl<string | null> }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  public async onSubmit() {
    if(this.form.invalid) return;

    try {
      const {email, name, password} = this.form.value;
      const { token } = await this.authService.register({
        email: email ?? '',
        name: name ?? '',
        password: password ?? ''
      });

      localStorage.setItem('token', token);
      this.router.navigate(['/products']);
    } catch (error) {
      console.error(error)
    }
  }
}