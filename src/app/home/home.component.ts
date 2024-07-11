import { Component, OnInit } from '@angular/core';
import { NoteService } from '../notes.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  notes: any[] = [];
  isLoggedIn: boolean = false;
  userId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notesService: NoteService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('isLoggedIn:', isLoggedIn);

      if (isLoggedIn) {
        this.authService.userId$.subscribe((userId) => {
          this.userId = userId;
          console.log('User ID:', userId);
          if (userId !== null) {
            this.loadNotes();
          }
        });
      } else {
        this.userId = null;
        this.notes = [];
        console.log('User is logged out');
      }
    });
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (response: any[]) => {
        this.notes = response;
        console.log('Loaded notes:', this.notes);
      },
      error: (error: any) => {
        console.error('Failed to load notes:', error);
      },
    });
  }

  editNote(noteId: number): void {
    const note = this.notes.find((note) => note.id === noteId);
    console.log('Attempting to edit note with ID:', noteId); // Log the note ID
    if (note) {
      console.log('Found note for editing:', note); // Log the note details
    }
    if (note && note.can_edit) {
      this.router.navigate(['/edit', noteId]);
    } else {
      console.error('You do not have permission to edit this note');
    }
  }

  deleteNote(noteId: number): void {
    const note = this.notes.find((note) => note.id === noteId);
    console.log('Attempting to delete note with ID:', noteId); // Log the note ID
    if (note) {
      console.log('Found note for deletion:', note); // Log the note details
    }
    if (note && note.can_edit) {
      this.notesService.deleteNoteById(noteId).subscribe({
        next: () => {
          console.log('Note deleted successfully');
          this.notes = this.notes.filter((note) => note.id !== noteId);
        },
        error: (error: any) => {
          console.error('Failed to delete note:', error);
        },
      });
    } else {
      console.error('You do not have permission to delete this note');
    }
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.notesService.searchNotes(searchTerm).subscribe({
        next: (response: any[]) => {
          this.notes = response;
        },
        error: (error: any) => {
          console.error('Failed to search notes:', error);
        },
      });
    } else {
      this.loadNotes(); // Load all notes if search term is empty
    }
  }
}
