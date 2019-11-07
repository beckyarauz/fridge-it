import { Component, OnInit } from '@angular/core';
import { EnvService } from './core/services/env.service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'fridge-it';

  constructor(
    private env: EnvService
  ) {
    if (env.enableDebug) {
      console.log('Debug mode enabled!');
    }
  }
  async ngOnInit(): Promise<void> {
    axios.get(`${this.env.apiUrl}`);
  }

}
