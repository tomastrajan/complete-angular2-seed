import { Component } from "angular2/core";
import { Input } from "angular2/core";
import { Repository } from "./github-service";

@Component({
    selector: "repository-info",
    template: `
        <div class="col s12 m6">
            <div class="card grey lighten-4">
                <div class="card-content grey-text text-darken-4">
                    <div class="row">
                        <div class="col m8">
                            <span class="card-title red-text text-accent-4">
                                {{repo.name}}
                            </span>
                        </div>
                        <div class="col m4 right-align">
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
                    <a class="blue-text text-darken-4" href="{{repo.url}}">Github</a>
                    <a class="blue-text text-darken-4" href="{{repo.homepage}}" *ngIf="repo.homepage">Homepage</a>
                    <input class="hide" [value]="repo.clone" />
                </div>
            </div>
        </div>
    `
})
export default class RepositoryInfoComponent {

    /* tslint:disable:no-unused-variable */
    @Input() private repo: Repository;
    /* tslint:enable:no-unused-variable */

}
