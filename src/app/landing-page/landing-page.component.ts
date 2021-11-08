import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}
  imagesForSlider = [
    { path: '/assets/images/galeria/banner.jpg' },
    { path: 'https://pbs.twimg.com/media/Ebusw_HVAAE5L7g.jpg' },
  ];

  ngOnInit(): void {}
}
