import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)

  const token = localStorage.getItem('token')
  if(!token) return await router.navigate(['/login']).then(() => false);

  // Verificar si el token tiene la propiedad 'exp' y si no ha expirado
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    return await router.navigate(['/login']).then(() => false); // Token mal formado
  }
  
  try {
    // Decodificar la parte del payload del JWT
    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    if (payload.exp < currentTime) {
      // Si el token ha expirado, redirige a login
      return await router.navigate(['/login']).then(() => false);
    }

    // Si el token es válido y no ha expirado, permite el acceso
    return true;
  } catch (error) {
    // Si hay un error decodificando el token, redirige a login
    return await router.navigate(['/login']).then(() => false);
  }
};
