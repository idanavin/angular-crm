import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';
import { routeSlider } from '../animations';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../services/theme.service';
import { CustomersService } from '../services/customers.service';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeSlider],
})
export class MainComponent implements OnInit {
  isLogged: boolean | undefined;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private customersService: CustomersService,
    private productService: ProductsService,
  ) {
    this.languageService.setDefaultLanguage();
    this.getInitData();
  }

  ngOnInit(): void {
    this.authService.authSuccess$.subscribe((isAuth) => {
      this.isLogged = isAuth;
    });
    this.checkIsLogged();
    this.themeService.setDefaultTheme();
  }
  
  async getInitData() {
    const products = await this.productService.getProducts();
    this.customersService.getCustomersWithProducts(50, products);
  }

  checkIsLogged() {
    const token = this.authService.getUserForLocalToken();

    this.isLogged = token ? true : false
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
