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
  user: User | undefined;

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
    this.authService.authSuccess$.subscribe((user) => {
      this.user = user;
    });
    this.isLogged();
    this.themeService.setDefaultTheme();
  }
  
  async getInitData() {
    const products = await this.productService.getProducts();
    this.customersService.getCustomersWithProducts(50, products);
  }

  isLogged() {
    const user = this.authService.getUserForLocalToken();

    if (user) {
      this.user = user;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
