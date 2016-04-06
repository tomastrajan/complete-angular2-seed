import { Component } from "angular2/core";
import { RouteParams } from "angular2/router";
import { COMMON_DIRECTIVES } from "angular2/common";

import GithubService, { ContentItem } from "./github-service";

@Component({
    selector: "repository",
    template: `
        <div class="col s12 m6">
            <h3>Browse repository</h3>
            <h5>{{name}}</h5>
            <ul>
                <li *ngFor="#item of items" [class]="'item ' + item.type">
                    <i *ngIf="item.type === 'dir'" class="material-icons">folder</i>
                    <i *ngIf="item.type === 'file'" class="material-icons">crop_portrait</i>
                    {{item.name}}
                </li>
            </ul>
        </div>
    `,
    directives: [COMMON_DIRECTIVES],
    providers: [GithubService]
})
export default class RepositoryComponent {

    private name: string;
    private items: ContentItem[];

    constructor(params: RouteParams, service: GithubService) {
        this.name = params.get("name");
        service.getContent(this.name)
            .subscribe(
                (value: ContentItem[]) => { this.items = value; },
                (err: any) => console.log("Error:", err),
                () => console.log("Done")
            );
    }

}
