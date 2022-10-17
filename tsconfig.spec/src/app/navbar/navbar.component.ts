import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToService() {
    document.getElementById('services')?.scrollIntoView();
  }

  scrollToAboutUs() {
    document.getElementById('about-us')?.scrollIntoView();
  }


}
