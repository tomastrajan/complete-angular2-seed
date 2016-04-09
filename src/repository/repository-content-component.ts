import { Injector, Component, AfterViewChecked } from "angular2/core";
import { RouteParams } from "angular2/router";
import GithubService, { ContentItem } from "../github/github-service";

// global lib highlight.js
declare const hljs: any;

@Component({
    selector: "repository-content",
    template: `
        <div class="col s12">
            <h5>{{item ? item.name : loading ? "Loading..." : "Content"}}</h5>
            <p *ngIf="!raw && !loading">Select file in content browser...</p>
            <pre *ngIf="raw"><code>{{raw}}</code></pre>
        </div>
    `
})
export default class RepositoryContentComponent implements AfterViewChecked {

    private loading: boolean = false;

    private owner: string;
    private repo: string;
    private path: string;

    private item: ContentItem;
    private raw: string;

    constructor(injector: Injector, params: RouteParams, service: GithubService) {
        const parentParams: RouteParams = injector.parent.parent.get(RouteParams);
        this.owner = parentParams.get("owner");
        this.repo = parentParams.get("repo");
        this.path = params.get("path");
        if (this.path) {
            this.loading = true;
            service.getContent(this.owner, this.repo, decodeURIComponent(this.path))
                .flatMap((item: ContentItem) => {
                    this.item = item;
                    return service.getContentRaw(decodeURIComponent(item.url));
                })
                .subscribe((raw: any) => {
                    this.raw = raw;
                    this.loading = false;
                });
        }
    }

    public ngAfterViewChecked(): any {
        $("pre code").each((i: any, block: any) => {
            hljs.highlightBlock(block);
        });
    }

}
