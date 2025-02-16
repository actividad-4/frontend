import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private _http: HttpClient) { }

  public  async login(body: { email?: string, password?: string }): Promise<{ token: string }> {
    const { token } = await firstValueFrom(this._http.post<{token: string}>(`${environment.baseUrl}/auth/login`, body))
    if(!token) throw new Error('Error al iniciar sesión')
    return { token }
  }

  public  async register(body: { email: string, name: string, password: string }): Promise<{ token: string }> {
    const { token } = await firstValueFrom(this._http.post<{token: string}>(`${environment.baseUrl}/auth/register`, body))
    if(!token) throw new Error('Error al crear la cuenta')
    return { token }
  }
}
