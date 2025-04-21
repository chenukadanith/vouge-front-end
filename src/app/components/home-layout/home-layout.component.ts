// home-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
    <!-- This is where HeroComponent will render -->
    
    <router-outlet name="secondary"></router-outlet>
    <router-outlet name="third"></router-outlet>

    <!-- This is where LatestProductsComponent will render -->
  `,
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {}