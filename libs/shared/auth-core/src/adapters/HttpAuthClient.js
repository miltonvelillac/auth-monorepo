"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpAuthClient = createHttpAuthClient;
const AuthError_1 = require("../errors/AuthError");
function createHttpAuthClient({ baseUrl, endpoint = '/login', fetcher = fetch, headers, projectIdFieldName = 'clientId', mapResponse, }) {
    return {
        async signIn(command) {
            const response = await fetcher(`${trimTrailingSlash(baseUrl)}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify({
                    username: command.username,
                    password: command.password,
                    projectId: command.projectId,
                    [projectIdFieldName]: command.projectId,
                }),
            });
            const payload = await readJson(response);
            if (!response.ok) {
                throw new AuthError_1.AuthError(readMessage(payload), 'HTTP_AUTH_ERROR', payload);
            }
            if (mapResponse) {
                return mapResponse(payload);
            }
            const data = unwrapData(payload);
            return {
                accessToken: data.token ?? data.accessToken,
                refreshToken: data.refreshToken,
                expiresAt: data.expiresAt,
                user: data.user ?? readUserFromPayload(data),
                raw: payload,
            };
        },
    };
}
function trimTrailingSlash(value) {
    return value.endsWith('/') ? value.slice(0, -1) : value;
}
async function readJson(response) {
    try {
        return await response.json();
    }
    catch {
        return {};
    }
}
function unwrapData(payload) {
    if (payload && typeof payload === 'object' && 'data' in payload) {
        return payload.data;
    }
    return (payload ?? {});
}
function readMessage(payload) {
    if (payload && typeof payload === 'object' && 'message' in payload) {
        return String(payload.message);
    }
    return 'Sign in request failed.';
}
function readUserFromPayload(payload) {
    if (!payload.username) {
        return undefined;
    }
    return {
        username: String(payload.username),
        roles: Array.isArray(payload.roles) ? payload.roles.map(String) : undefined,
        displayName: payload.displayName ? String(payload.displayName) : undefined,
    };
}
//# sourceMappingURL=HttpAuthClient.js.map