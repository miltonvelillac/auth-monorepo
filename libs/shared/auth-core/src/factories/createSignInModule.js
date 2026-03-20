"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignInModule = createSignInModule;
const createSignInStore_1 = require("../state/createSignInStore");
function createSignInModule(options) {
    return {
        store: (0, createSignInStore_1.createSignInStore)(options),
    };
}
//# sourceMappingURL=createSignInModule.js.map