import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productivity-tableau',
  templateUrl: './productivity-tableau.component.html',
  styleUrls: ['./productivity-tableau.component.scss']
})
export class ProductivityTableauComponent implements OnInit {
    // put as it is in link column in db
  type = 'performance-dashboard';
  constructor() { }

  ngOnInit() {
  }

}
