import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthguardService } from './guard/authguard.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent, canActivate: [AuthguardService]},
     // redirects the empty path to home
     // pathMatch: only does this if the url path exactly mateches the empty path, preventing partial matches
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'about-page', component: AboutPageComponent, canActivate: [AuthguardService]},
    { path: 'contact-page', component: ContactPageComponent,  canActivate: [AuthguardService]},
    { path: 'product-page', component: ProductPageComponent,  canActivate: [AuthguardService]},
    { path: 'product-page/:category', component: ProductPageComponent,  canActivate: [AuthguardService]},
    { path: 'product-detail-page/:id', component: ProductDetailPageComponent,  canActivate: [AuthguardService]},
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'checkout', component: CheckoutPageComponent },
];
