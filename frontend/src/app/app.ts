import {Component} from '@angular/core';
import {Toolbar} from './shared/toolbar/toolbar';
import {Recipes} from './recipes/recipes';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toolbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
