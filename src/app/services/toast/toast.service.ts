import { Injectable, signal } from '@angular/core';

export interface ToastInfo {
  header?: string;
  body?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })

export class ToastService {

  constructor() { }

  toasts = signal<ToastInfo[]>([]);

  show(options: {header?: string, body?: string, delay?: number}) {
    const { header, body, delay } = options
    this.toasts().push({ header, body, delay });
  }

  remove(toast: ToastInfo) {
    this.toasts.set(this.toasts().filter(t => t != toast));
  }
}