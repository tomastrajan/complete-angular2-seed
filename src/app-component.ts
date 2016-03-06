import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig } from "angular2/router";

import GithubComponent from "./github/gihub-component";

@Component({
    selector: "app",
    template: `
        <nav class="blue darken-4">
            <div class="nav-wrapper container"><a id="logo-container" href="/" class="brand-logo">Complete Angular 2 Seed</a>
                <ul class="right hide-on-med-and-down">
                    <li><a [routerLink]="['Github']">Github</a></li>
                </ul>
                <ul id="nav-mobile" class="side-nav">
                    <li><a [routerLink]="['Github']">Github</a></li>
                </ul>
                <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {
        path: "/github",
        name: "Github",
        component: GithubComponent,
        useAsDefault: true
    }
])
export default class AppComponent {


}
