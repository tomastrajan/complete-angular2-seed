import { Observable } from "rxjs/Observable";
import { Injectable } from "angular2/core";
import { Http, Response } from "angular2/http";

import Config from "../config";

@Injectable()
export default class GithubService {

    constructor(
        private http: Http,
        private config: Config
    ) {}

    public getRepos(query: any): Observable<Repository> {
        return this.http
            .get(`${this.config.API_URL}search/repositories?q=${query}`)
            .map((res: Response) => res.json())
            .map((data: any) => data.items
                .map(this.dtoToModelRepository)
                .sort(this.sortByStargazers)
            );
    }

    public getContent(fullName: string): any {
        return this.http
            .get(`${this.config.API_URL}repos/${fullName}/contents/`)
            .map((res: Response) => res.json())
            .map((data: any) => data
                .map(this.dtoToModelContent)
                .sort(this.sortByType)
            );
    }

    private sortByStargazers(a: Repository, b: Repository): number {
        return a.stargazers < b.stargazers ? 1 : a.stargazers > b.stargazers ? -1 : 0;
    }

    private sortByType(a: ContentItem, b: ContentItem): number {
        if (a.type !== b.type) {
            return a.type === "file" ? 1 : -1;
        } else {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
    }

    private dtoToModelRepository(item: any): Repository {
        return {
            id: item.id,
            name: item.full_name,
            description: item.description,

            url: item.html_url,
            clone: item.clone_url,
            homepage: item.homepage,

            stargazers: item.stargazers_count,
            forks: item.forks_count,
            owner: {
                id: item.owner.id,
                type: item.owner.type,
                name: item.owner.login,

                url: item.owner.html_url,
                avatar: item.owner.avatar_url
            }
        };
    }

    /* tslint:disable:variable-name */
    private dtoToModelContent({ name, path, type, download_url }: any): ContentItem {
        return { name, path, type, downloadUrl: download_url };
    }
    /* tslint:enable:variable-name */

}

export interface Repository {
    id: String;
    name: String;
    description: String;

    url: String;
    clone: String;
    homepage: String;

    stargazers: String;
    forks: String;
    owner: Owner;
}

export interface Owner {
    id: String;
    type: String;
    name: String;

    url: String;
    avatar: String;
}

export interface ContentItem {
    name: string;
    path: string;
    type: string;
    downloadUrl: string;
}
