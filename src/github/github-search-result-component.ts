import { Component, Input } from "angular2/core";
import { ROUTER_DIRECTIVES } from "angular2/router";
import { Repository } from "./github-service";

@Component({
    selector: "github-search-result",
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div class="col s12 m6">
            <div class="card grey lighten-4">
                <div class="card-content grey-text text-darken-4">
                    <div class="row">
                        <div class="col m7">
                            <a class="card-title red-text text-accent-4" 
                                [routerLink]="['/Repository', { owner: repo.owner.name, repo: repo.name }]">
                                {{repo.name}}
                            </a>
                        </div>
                        <div class="col m5 right-align">
                            <span *ngIf="repo.stargazers" class="icon-number">
                                <i class="material-icons">star</i> {{repo.stargazers}}
                            </span>
                            <span *ngIf="repo.forks" class="icon-number">
                                <i class="material-icons">call_split</i> {{repo.forks}}
                            </span>
                        </div>
                    </div>
                    <p>{{repo.description}}</p>
                </div>
                <div class="card-action">
                    <a class="blue-text text-darken-4" [href]="repo.url">Github</a>
                    <a class="blue-text text-darken-4" [href]="repo.homepage" *ngIf="repo.homepage">Homepage</a>
                    <input class="hide" [value]="repo.clone" />
                    <a [href]="repo.owner.url">
                        <img class="avatar" [src]="repo.owner.avatar" />                    
                    </a>
                </div>
            </div>
        </div>
    `
})
export default class GithubSearchResultComponent {

    @Input() public repo: Repository;

}
