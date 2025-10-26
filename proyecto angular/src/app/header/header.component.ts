// Ruta: src/app/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RoleService, UserRole } from '../shared/services/role.service'; 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule 
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public currentRole: UserRole = 'Comprador';

  // Inyectamos el servicio en el constructor
  constructor(private roleService: RoleService) {}

  // En ngOnInit, nos suscribimos a los cambios de rol
  ngOnInit(): void {
    this.roleService.currentUserRole$.subscribe(role => {
      this.currentRole = role;
    });
  }

  // Método que se llamará al hacer clic en el botón
  public switchRole(): void {
    this.roleService.toggleRole();
  }
}