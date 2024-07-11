import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Example: Home component
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { NoteService } from './notes.service';
import { AuthService } from './auth.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { NoteComponent } from './note/note.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    CreateComponent,
    EditComponent,
    NoteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Add FormsModule here
  ],
  providers: [
    AuthService,
    NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
