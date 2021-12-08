import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent implements OnInit {
  constructor() {}

  contenidoMarkdown = '';

  //Lo emitimos al componente padre
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  inputTextArea(texto) {
    this.contenidoMarkdown = texto;
    this.change.emit(texto);
  }
}
