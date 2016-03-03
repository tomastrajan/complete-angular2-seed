import "reflect-metadata";
import * as assert from "assert";

import AppService from "./app-service";

describe("main", () => {

    let service: AppService;

    beforeEach(() => {
        service = new AppService();
    });

    it("gets name", () => {
        const name: String = service.getName();

        assert.equal(name, "Tomas");
    });

});
