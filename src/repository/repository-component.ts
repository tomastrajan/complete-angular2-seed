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
                    <li *ngIf="path.length > 1" class="item dir" (click)="browseDir(getParentPath())">
                        <i class="material-icons">arrow_upward</i>
                        ../
                    </li>
                    <li *ngFor="#item of items" [class]="'item ' + item.type">
                        <span *ngIf="item.type === 'dir'" (click)="browseDir(item.path)">
                            <i class="material-icons">folder</i>
                            {{item.name}}
                        </span>
                        <a *ngIf="item.type === 'file'" [routerLink]="['./Content', { path: encodePath(item.path) }]">
                            <i class="material-icons">crop_portrait</i>
                            {{item.name}}
                        </a>
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
    { path: "/", name: "Content", component: RepositoryContentComponent, useAsDefault: true },
    { path: "/:path", name: "Content", component: RepositoryContentComponent }
])
export default class RepositoryComponent {

    private service: GithubService;

    private owner: string;
    private repo: string;

    private path: string[] = ["/"];
    private itemsCache: any = {};
    private items: ContentItem[];


    constructor(params: RouteParams, service: GithubService) {
        this.service = service;
        this.owner = params.get("owner");
        this.repo = params.get("repo");
        service.getContent(this.owner, this.repo)
            .subscribe(
                (items: ContentItem[]) => {
                    this.items = items;
                    this.itemsCache[this.getCurrentPath()] = items;
                },
                (err: any) => console.log("Error:", err));
    }

    public browseDir(path: string): void {
        if (this.itemsCache[path]) {
            this.items = this.itemsCache[path];
            this.handlePathUpdate(path);
            return;
        }
        this.service.getContent(this.owner, this.repo, path)
            .subscribe((items: any) => {
                this.handlePathUpdate(path);
                this.items = items;
                this.itemsCache[path] = items;
            });
    }

    public encodePath(path: string): string {
        return encodeURIComponent(path);
    }

    private handlePathUpdate(path: string): void {
        if (this.getParentPath() === path) {
            this.path.pop();
        } else {
            this.path.push(path);
        }
    }

    private getCurrentPath(): string {
        return this.path[this.path.length - 1];
    }

    private getParentPath(): string {
        return this.path[this.path.length - 2];
    }

}
