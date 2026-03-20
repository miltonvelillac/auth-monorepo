"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignInStore = createSignInStore;
const SignInUseCase_1 = require("../use-cases/SignInUseCase");
function createSignInStore({ projectId, authClient, initialCredentials, }) {
    const listeners = new Set();
    const useCase = new SignInUseCase_1.SignInUseCase(authClient);
    let state = {
        projectId,
        status: 'idle',
        credentials: {
            username: initialCredentials?.username ?? '',
            password: initialCredentials?.password ?? '',
        },
        session: null,
        error: null,
    };
    const notify = () => {
        listeners.forEach((listener) => listener());
    };
    const setState = (nextState) => {
        state = nextState;
        notify();
    };
    return {
        getState: () => state,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setCredential: (field, value) => {
            setState({
                ...state,
                credentials: {
                    ...state.credentials,
                    [field]: value,
                },
                error: null,
            });
        },
        submit: async (overrides) => {
            setState({
                ...state,
                status: 'submitting',
                error: null,
            });
            try {
                const credentials = {
                    ...state.credentials,
                    ...overrides,
                };
                const session = await useCase.execute({
                    projectId: state.projectId,
                    ...credentials,
                });
                setState({
                    ...state,
                    credentials,
                    session,
                    status: 'success',
                    error: null,
                });
                return session;
            }
            catch (error) {
                setState({
                    ...state,
                    credentials: {
                        ...state.credentials,
                        ...overrides,
                    },
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Unexpected sign in error.',
                });
                return undefined;
            }
        },
        reset: () => {
            setState({
                projectId: state.projectId,
                status: 'idle',
                credentials: {
                    username: '',
                    password: '',
                },
                session: null,
                error: null,
            });
        },
    };
}
//# sourceMappingURL=createSignInStore.js.map