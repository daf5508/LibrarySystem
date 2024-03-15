import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  collapseNavbar(event: any): void {
    
    const navbar = document.getElementById('navbar');

    if (!navbar?.contains(event.relatedTarget as Node))
    {
      const navbarCollapse = navbar?.querySelector('.navbar-collapse');

      if (navbarCollapse?.classList.contains('show'))
      {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}