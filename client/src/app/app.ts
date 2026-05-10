import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('first_project');

  constructor(public router: Router) {}

  get showHeader(): boolean {
    return !this.router.url.startsWith('/auth');
  }

  get showFooter(): boolean {
    return !this.router.url.startsWith('/auth');
  }

}
