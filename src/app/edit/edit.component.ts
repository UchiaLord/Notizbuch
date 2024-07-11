import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../notes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  note: any = {
    id: 0, // Initialisieren mit einem Standardwert
    title: '',
    content: '',
  };

  permissions: any = {
    canView: false,
    canEdit: false,
    username: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    // ID aus der Route lesen und die Details der Notiz abrufen
    const noteId = this.route.snapshot.params['id'];
    if (noteId) {
      this.note.id = noteId;
      this.fetchNoteDetails(noteId);
    }
  }

  fetchNoteDetails(noteId: number): void {
    this.noteService.getNoteById(noteId).subscribe({
      next: (note: any) => {
        this.note = note;
        console.log('Fetched note details:', this.note); // Logging für Debugging
      },
      error: (error: any) => {
        console.error('Failed to fetch note details:', error);
      },
    });
  }

  toggleCanView(): void {
    if (!this.permissions.canView) {
      this.permissions.username = '';
      this.permissions.canEdit = false;
    }
  }

  onSubmit(): void {
    const noteData = {
      id: this.note.note_id, // Hier die korrekte ID setzen
      title: this.note.title,
      content: this.note.content,
      permissions: {
        canView: this.permissions.canView,
        username: this.permissions.canView ? this.permissions.username : null,
        canEdit: this.permissions.canEdit,
      },
    };

    console.log('Submitting note data:', noteData); // Logging für Debugging

    this.noteService.updateNote(noteData).subscribe({
      next: (response: any) => {
        console.log('Note updated successfully:', response.message);
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Failed to update note:', error.error.message);
      },
    });
  }
}
