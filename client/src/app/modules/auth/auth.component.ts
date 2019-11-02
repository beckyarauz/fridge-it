import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../core/services/env.service';
import axios from 'axios';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(
    private env: EnvService
  ) { }

  ngOnInit() {

    axios.post(`${this.env.apiUrl}/auth`, {
      username: 'admin',
      password: '123',
    });
  }

}
