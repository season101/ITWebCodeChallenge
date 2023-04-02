import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  items: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/assets/news.xml', { responseType: 'text' })
    .subscribe((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const items = xml.getElementsByTagName('item');

      for (let i = 0; i < items.length; i++) {
        this.items.push(
          {
            title:items[i].getElementsByTagName('title')[0].textContent,
            link: items[i].getElementsByTagName('link')[0].textContent, 
            description: items[i].getElementsByTagName('description')[0].textContent,
            author:items[i].getElementsByTagName('author')[0].textContent,
            pubDate:items[i].getElementsByTagName('pubDate')[0].textContent,
            category:items[i].getElementsByTagName('category')[0].textContent?.split(","),
            imageUrl:items[i].getElementsByTagName('media:thumbnail')[0].getAttribute('url'),

          }
        );
      }
    });
    
  }
}
