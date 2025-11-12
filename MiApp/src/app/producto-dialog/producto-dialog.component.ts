import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Producto } from '../interfaces/Producto';

@Component({
     selector: 'app-producto-dialog',
     standalone: true,
     imports: [
          ReactiveFormsModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatCheckboxModule,
          MatSnackBarModule,
          CommonModule
     ],
     templateUrl: './producto-dialog.component.html',
     styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent {
     private fb = inject(FormBuilder);
     private snackBar = inject(MatSnackBar);

     public form: FormGroup;
     public isEdit: boolean = false;

     constructor(
          private dialogRef: MatDialogRef<ProductoDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public data: { producto?: Producto }
     ) {
          this.isEdit = !!data.producto;
          this.form = this.fb.group({
               nombre: [data.producto?.nombre || '', Validators.required],
               marca: [data.producto?.marca || '', Validators.required],
               completada: [data.producto?.completada || false]
          });
     }

     guardar() {
          if (this.form.valid) {
               const producto: Producto = {
                    idProducto: this.data.producto?.idProducto || 0,
                    nombre: this.form.value.nombre,
                    marca: this.form.value.marca,
                    completada: this.form.value.completada
               };

               // ✅ Mostrar notificación al crear tarea
               if (!this.isEdit) {
                    this.snackBar.open('✅ Tarea creada correctamente', 'Cerrar', {
                         duration: 3000,
                         horizontalPosition: 'center',
                         verticalPosition: 'top'
                    });
               }

               this.dialogRef.close(producto);
          }
     }

     cancelar() {
          this.dialogRef.close();
     }
}
