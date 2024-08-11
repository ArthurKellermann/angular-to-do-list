import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />2`
})
export class AppComponent {
  title = 'curso-angular-lista-de-tarefas';
}
