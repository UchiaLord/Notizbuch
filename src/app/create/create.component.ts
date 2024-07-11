import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../notes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form: any = {
    title: '',
    content: '',
    canView: false,
    canEdit: false,
    username: '',
  };

  constructor(private notesService: NoteService, private router: Router) {}

  toggleCanView() {
    if (!this.form.canView) {
      this.form.username = '';
      this.form.canEdit = false;
    }
  }

  onSubmit() {
    const noteData = {
      title: this.form.title,
      content: this.form.content,
      permissions: {
        canView: this.form.canView,
        username: this.form.canView ? this.form.username : null,
        canEdit: this.form.canEdit,
      },
    };
  
    // Disable canEdit if current user is the creator
    if (this.isUserCreator()) {
      noteData.permissions.canEdit = true; // Ensure creator can always edit
    }
  
    this.notesService.createNote(noteData).subscribe({
      next: (response: any) => {
          console.log('Note created successfully:', response.message);
          this.router.navigate(['/']); // Navigate to home component
      },
      error: (error: any) => {
          if (error && error.error && error.error.message) {
              console.error('Failed to create note:', error.error.message);
          } else {
              console.error('Unexpected error:', error);
          }
          // Handle error: show error message to user
      }
    });
  }
  
  isUserCreator(): boolean {
    // Implement logic to check if current user is the creator
    // You might need to get user details from your session or authentication service
    return true; // Replace with your logic to determine if current user is creator
  }  
}
