import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  nombre:string= "";
  isOpen = false;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.nombre = this.cookieService.get('name');
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
