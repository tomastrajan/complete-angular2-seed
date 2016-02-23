import * as assert from "assert";

import * as main from "./main";

describe("main", () => {


    it("runs", () => {
        const result: number = main.main();

        assert.equal(result, 3);
    });

});
