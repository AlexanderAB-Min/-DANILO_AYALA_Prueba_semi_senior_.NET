import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/Producto';
import { ProductoDialogComponent } from '../../producto-dialog/producto-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
     selector: 'app-inicio',
     standalone: true,
     imports: [
          CommonModule,
          MatCardModule,
          MatTableModule,
          MatButtonModule,
          MatDialogModule,
          MatIconModule,
          MatFormFieldModule,
          MatSelectModule
     ],
     templateUrl: './inicio.component.html',
     styleUrl: './inicio.component.css'
})
export class InicioComponent {
     private productoServicio = inject(ProductoService);
     private dialog = inject(MatDialog);

     public listaProducto: Producto[] = [];
     public listaProductoFiltrada: Producto[] = [];
     public filtroEstado: string = 'todas';
     public displayedColumns: string[] = ['nombre', 'marca', 'completada', 'acciones'];

     // ✅ Nuevas métricas
     public totalTareas: number = 0;
     public tareasCompletadas: number = 0;
     public tareasPendientes: number = 0;

     constructor() {
          this.cargarProductos();
     }

     cargarProductos() {
          this.productoServicio.lista().subscribe({
               next: (data) => {
                    if (data.value.length > 0) {
                         this.listaProducto = data.value;
                         this.aplicarFiltro();
                         this.calcularMetricas(); // ✅ Calcula métricas al cargar
                    } else {
                         this.listaProducto = [];
                         this.listaProductoFiltrada = [];
                         this.calcularMetricas();
                    }
               },
               error: (err) => {
                    console.log(err.message);
               }
          });
     }

     aplicarFiltro() {
          if (this.filtroEstado === 'todas') {
               this.listaProductoFiltrada = [...this.listaProducto];
          } else if (this.filtroEstado === 'completadas') {
               this.listaProductoFiltrada = this.listaProducto.filter(p => p.completada);
          } else if (this.filtroEstado === 'pendientes') {
               this.listaProductoFiltrada = this.listaProducto.filter(p => !p.completada);
          }
     }

     // ✅ Calcular métricas
     calcularMetricas() {
          this.totalTareas = this.listaProducto.length;
          this.tareasCompletadas = this.listaProducto.filter(p => p.completada).length;
          this.tareasPendientes = this.listaProducto.filter(p => !p.completada).length;
     }

     abrirCrear() {
          const dialogRef = this.dialog.open(ProductoDialogComponent, {
               width: '400px',
               data: {}
          });

          dialogRef.afterClosed().subscribe(result => {
               if (result) {
                    this.productoServicio.crear(result).subscribe({
                         next: (res) => {
                              if (res.isSuccess) {
                                   this.cargarProductos();
                              } else {
                                   alert('Error al crear tarea');
                              }
                         },
                         error: (err) => console.log(err)
                    });
               }
          });
     }

     abrirEditar(producto: Producto) {
          const dialogRef = this.dialog.open(ProductoDialogComponent, {
               width: '400px',
               data: { producto }
          });

          dialogRef.afterClosed().subscribe(result => {
               if (result) {
                    this.productoServicio.editar(producto.idProducto, result).subscribe({
                         next: (res) => {
                              if (res.isSuccess) {
                                   this.cargarProductos();
                              } else {
                                   alert('Error al editar tarea');
                              }
                         },
                         error: (err) => console.log(err)
                    });
               }
          });
     }

     toggleCompletada(producto: Producto) {
          const updatedProducto = { ...producto, completada: !producto.completada };
          this.productoServicio.editar(producto.idProducto, updatedProducto).subscribe({
               next: (res) => {
                    if (res.isSuccess) {
                         this.cargarProductos();
                    } else {
                         alert('Error al actualizar el estado de la tarea');
                    }
               },
               error: (err) => console.log(err)
          });
     }

     eliminar(producto: Producto) {
          if (confirm(`¿Estás seguro de eliminar la tarea "${producto.nombre}"?`)) {
               this.productoServicio.eliminar(producto.idProducto).subscribe({
                    next: (res) => {
                         if (res.isSuccess) {
                              this.cargarProductos();
                         } else {
                              alert('Error al eliminar tarea');
                         }
                    },
                    error: (err) => console.log(err)
               });
          }
     }
}
