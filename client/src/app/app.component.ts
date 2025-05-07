import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jewnet';
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  products: any[] = [];
 
  ngOnInit(): void {
    this.http.get<any>(this.baseUrl + 'products').subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}