import { Component, Input } from '@angular/core';
import { Brand } from '../../model/brand.model';

@Component({
  selector: 'app-brand-logos',
  templateUrl: './brand-logos.component.html',
  styleUrls: ['./brand-logos.component.css']
})
export class BrandLogosComponent {
  @Input() title: string = 'Trusted Brands';
  @Input() brands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
      logo: 'assets/brands/Lenovo-Logo.png',
      website: 'https://nike.com'
    },
    {
      id: 2,
      name: 'Adidas',
      logo: 'assets/brands/hp.png',
      website: 'https://adidas.com'
    },
    {
      id: 3,
      name: 'Apple',
      logo: 'assets/brands/Asus-Logo.png',
      website: 'https://apple.com'
    },
    {
      id: 4,
      name: 'Samsung',
      logo: 'assets/brands/Dell_Logo.svg.png',
      website: 'https://samsung.com'
    },
    {
      id: 5,
      name: 'Sony',
      logo: 'assets/brands/msi.png',
      website: 'https://sony.com'
    }
  ];
}