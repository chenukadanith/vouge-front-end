import { Routes } from '@angular/router';
import { StudentListComponent } from '../app/components/student-list/student-list.component';
import { HeroComponent } from './hero/hero.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { BrandLogosComponent } from './components/brand-logos/brand-logos.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from '../app/features/auth/login/login.component';
import { RegisterComponent } from '../app/features/auth/register/register.component';
import { PublicLayoutComponent } from '../app/PublicLayoutComponent';
import { ProtectedLayoutComponent } from '../app/ProtectedLayoutComponent';

export const routes: Routes = [
  // Public routes with public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  
  // Protected routes with protected layout (with navbar and footer)
  {
    path: '',
    component: ProtectedLayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: 'home', 
        component: HomeLayoutComponent,
        children: [
          { path: '', component: HeroComponent },
          { path: '', component: LatestProductsComponent, outlet: 'secondary' },
          { path: '', component: BrandLogosComponent, outlet: 'third' }
        ]
      },
      { path: 'viewProducts', component: AllProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'students', component: StudentListComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  
  // Wildcard route
  { path: '**', redirectTo: 'login' }
];