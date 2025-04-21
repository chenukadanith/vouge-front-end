import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-footer',
  imports: [RouterLink], // Required for routerLink to work

  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  footerLinks = [
    { title: 'Shop', links: [
      { name: 'All Products', url: '/products' },
      { name: 'New Arrivals', url: '/new-arrivals' },
      { name: 'Best Sellers', url: '/best-sellers' },
      { name: 'Special Offers', url: '/offers' }
    ]},
    { title: 'Customer Service', links: [
      { name: 'Contact Us', url: '/contact' },
      { name: 'FAQs', url: '/faqs' },
      { name: 'Shipping Policy', url: '/shipping' },
      { name: 'Returns & Exchanges', url: '/returns' }
    ]},
    { title: 'About Us', links: [
      { name: 'Our Story', url: '/about' },
      { name: 'Careers', url: '/careers' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Terms of Service', url: '/terms' }
    ]}
  ];

  socialIcons = [
    { name: 'Facebook', icon: 'fa-facebook', url: '#' },
    { name: 'Twitter', icon: 'fa-twitter', url: '#' },
    { name: 'Instagram', icon: 'fa-instagram', url: '#' },
    { name: 'Pinterest', icon: 'fa-pinterest', url: '#' }
  ];
}