import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css'
})
export class FileInputComponent {
  @Input() control!: FormControl;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Refere-se ao input de arquivo
  selectedFileName: string = ''; // Nome do arquivo selecionado
  selectedFile: File | null = null;

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFileName = files[0].name;
      this.selectedFile = files[0];  // Guardando o arquivo selecionado
      this.control.setValue(this.selectedFile)
    } else {
      this.selectedFileName = '';
      this.selectedFile = null;
    }
  }
}
