import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from './shared/interfaces/menu-item';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'xenoblade-api';
    menus: MenuItem[] = [];

    constructor(private router: Router, private activateRoute: ActivatedRoute) {}

    ngOnInit(): void {
        for (let i = 0; i < this.router.config.length; i++) {
            const route = this.router.config[i];
            if (route.children) {
                this.menus.push({ header: route.title?.toString() });
            }
        }
    }
}
