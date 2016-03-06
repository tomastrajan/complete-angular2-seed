import { Component } from "angular2/core";
import { Control } from "angular2/common";

import GithubService, { Repository } from "./github-service";
import {NgFor} from "angular2/common";
import RepositoryInfoComponent from "./repository-info-component";

@Component({
    selector: "github",
    template: `
        <div class="section">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col m11">
                        <input placeholder="Repository name" id="name" type="text" class="validate"
                            [ngFormControl]="query">
                        <label for="name">Search</label>
                    </div>
                    <div class="col m1" *ngIf="repos.length">
                        <i class="material-icons" style="cursor: pointer; margin-top: 30px;"
                            (click)="reset()">
                            delete
                        </i>
                    </div>
                </div>
            </form>
            <div class="row">
                <repository-info *ngFor="#repo of repos" [repo]="repo"></repository-info>
            </div>
        </div>
    `,
    directives: [NgFor, RepositoryInfoComponent],
    providers: [GithubService]
})
export default class GithubComponent {

    private query: Control;
    private repos: Repository[] = [];

    constructor(private githubService: GithubService) {
        this.query = new Control();

        this.query.valueChanges
            .debounceTime(300)
            .filter((query: String) => query.length > 0)
            .switchMap((query: String) => this.githubService.getRepos(query))
            .subscribe(
                (value: Repository[]) => { this.repos = value; },
                (err: any) => console.log("Error:", err),
                () => console.log("Done")
            );

        this.query.valueChanges
            .debounceTime(300)
            .filter((query: String) => query.length === 0)
            .subscribe(() => { this.repos = []; });
    }

    public reset(): void {
        this.query.updateValue("");
    }

}
