import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() title: string = 'Welcome to Our Store';
  @Input() subtitle: string = 'Discover amazing products at unbeatable prices';
  @Input() buttonText: string = 'Shop Now';
  @Input() imageUrl: string = 'assets/hero-image.png';
}