import { Component } from "angular2/core";
import { COMMON_DIRECTIVES, Control } from "angular2/common";

import GithubService, { Repository } from "./github-service";
import RepositoryInfoComponent from "./github-search-result-component";

@Component({
    selector: "github",
    template: `
        <div class="section">
            <h3>Welcome to GitHub Explorer</h3>
            <form class="col s12">
                <div class="row">
                    <div class="input-field col m11">
                        <input id="name" type="text" class="validate" [ngFormControl]="query">
                        <label for="name">Search repository by name</label>
                    </div>
                    <div class="col m1" *ngIf="repos.length || notFound">
                        <i class="material-icons" style="cursor: pointer; margin-top: 30px;" (click)="reset()">
                            delete
                        </i>
                    </div>
                </div>
            </form>
            <div class="row">
                <p *ngIf="notFound" style="text-align: center">No repositories found</p>
                <github-search-result *ngFor="#repo of repos" [repo]="repo"></github-search-result>
            </div>
        </div>
    `,
    directives: [COMMON_DIRECTIVES, RepositoryInfoComponent],
    providers: [GithubService]
})
export default class GithubComponent {

    private query: Control = new Control();
    private repos: Repository[] = [];
    private notFound: boolean = false;

    constructor(private githubService: GithubService) {
        this.query.valueChanges
            .debounceTime(250)
            .filter((query: String) => query.length > 0)
            .switchMap((query: String) => this.githubService.getRepos(query))
            .subscribe(
                (value: Repository[]) => {
                    this.repos = value;
                    this.notFound = !value.length;
                },
                (err: any) => console.log("Error:", err),
                () => console.log("Done")
            );

        this.query.valueChanges
            .debounceTime(250)
            .filter((query: String) => query.length === 0)
            .subscribe(() => {
                this.repos = [];
                this.notFound = false;
            });
    }

    public reset(): void {
        this.query.updateValue("");
    }

}
