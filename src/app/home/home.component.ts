import { Component, OnInit } from '@angular/core';
import { NoteService } from '../notes.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
      if (isLoggedIn) {
        this.authService.userId$.subscribe(userId => {
          this.userId = userId; // Access userId from AuthService
          this.loadNotes();
          console.log('User ID:', this.userId); // Log user ID when logged in
        });
      } else {
        this.userId = null;
        this.notes = [];
      }
    });
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (response: any[]) => {
        this.notes = response;
      },
      error: (error: any) => {
        console.error('Failed to load notes:', error);
        // Handle error: show error message to user
      }
    });
  }

  editNote(noteId: number): void {
    // Ensure user has edit permission for this note
    const note = this.notes.find(note => note.id === noteId);
    if (note && note.can_edit) {
      this.router.navigate(['/edit', noteId]);
    } else {
      console.error('You do not have permission to edit this note');
      // Handle error: show error message to user or navigate to an error page
    }
  }

  deleteNote(noteId: number): void {
    const note = this.notes.find(note => note.id === noteId);
    if (note && note.can_edit) {
      this.notesService.deleteNoteById(noteId).subscribe({
        next: () => {
          console.log('Note deleted successfully');
          // Remove the note from the local list of notes
          this.notes = this.notes.filter(note => note.id !== noteId);
        },
        error: (error: any) => {
          console.error('Failed to delete note:', error);
          // Handle error: show error message to user
        }
      });
    } else {
      console.error('You do not have permission to delete this note');
      // Handle error: show error message to user or navigate to an error page
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
          // Handle error: show error message to user
        }
      });
    } else {
      this.loadNotes(); // Load all notes if search term is empty
    }
  }
}
