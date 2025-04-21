import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Students</h2>
    <button (click)="loadStudents()">Refresh</button>
    <ul>
      <li *ngFor="let student of studentService.students()">
        {{ student.name }} (ID: {{ student.id }})
      </li>
    </ul>
  `
})
export class StudentListComponent {
  studentService = inject(StudentService);

  loadStudents() {
    this.studentService.fetchAll();
  }

  ngOnInit() {
    this.loadStudents(); // Auto-load on init
  }
}