import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES, RouteConfig, RouteParams } from "angular2/router";

import GithubService, { ContentItem } from "./../github/github-service";
import RepositoryContentComponent from "./repository-content-component";

@Component({
    selector: "repository",
    template: `
        <div class="row">
            <div class="col s12">
                <h3>{{owner}} / {{repo}}</h3>
            </div>
       </div>
       <div class="row">
            <div class="col s12 m4">
                <h5>Browser</h5>
                <ul>
                    <li *ngFor="#item of items" [class]="'item ' + item.type">
                        <i *ngIf="item.type === 'dir'" class="material-icons">folder</i>
                        <i *ngIf="item.type === 'file'" class="material-icons">crop_portrait</i>
                        <span *ngIf="item.type === 'dir'">{{item.name}}</span>
                        <a *ngIf="item.type === 'file'" [routerLink]="['./Content', { path: item.path }]">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <div class="col s12 m8">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [GithubService]
})
// 
@RouteConfig([
    { path: "/:path", name: "Content", component: RepositoryContentComponent }
])
export default class RepositoryComponent {

    private owner: string;
    private repo: string;
    private items: ContentItem[];

    constructor(params: RouteParams, service: GithubService) {
        this.owner = params.get("owner");
        this.repo = params.get("repo");
        service.getContent(this.owner, this.repo)
            .subscribe(
                (value: ContentItem[]) => { this.items = value; },
                (err: any) => console.log("Error:", err));
    }

}
