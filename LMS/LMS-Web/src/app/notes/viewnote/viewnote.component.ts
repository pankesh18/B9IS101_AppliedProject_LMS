import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';
import { BatchNote } from '../note.models';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.component.html',
  styleUrls: ['./viewnote.component.css']
})
export class ViewnoteComponent implements OnInit {


  @Input()  note: BatchNote;
    body: any;
  constructor(private objNotesService: NotesService, private objLoginService: LoginService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //this.objNotesService.persistNote.subscribe(note => this.note = note);
    this.body = this.sanitizer.bypassSecurityTrustHtml(this.note.NoteBody);

  }

}
