import {Component} from '@angular/core';
import {Toolbar} from './shared/toolbar/toolbar';
import {Recipes} from './recipes/recipes';

@Component({
  selector: 'app-root',
  imports: [ Toolbar, Recipes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
