import { type AuthClient, type SignInCommand, type SignInSession } from '../contracts/auth.types';
import { AuthError } from '../errors/AuthError';

export type HttpAuthClientOptions = {
  baseUrl: string;
  endpoint?: string;
  fetcher?: typeof fetch;
  headers?: Record<string, string>;
  projectIdFieldName?: string;
  mapResponse?: (payload: unknown) => SignInSession;
};

export function createHttpAuthClient({
  baseUrl,
  endpoint = '/login',
  fetcher = fetch,
  headers,
  projectIdFieldName = 'clientId',
  mapResponse,
}: HttpAuthClientOptions): AuthClient {
  return {
    async signIn(command: SignInCommand): Promise<SignInSession> {
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
        throw new AuthError(readMessage(payload), 'HTTP_AUTH_ERROR', payload);
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

function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function unwrapData(payload: unknown) {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: Record<string, any> }).data;
  }

  return (payload ?? {}) as Record<string, any>;
}

function readMessage(payload: unknown) {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    return String((payload as { message: unknown }).message);
  }

  return 'Sign in request failed.';
}

function readUserFromPayload(payload: Record<string, any>) {
  if (!payload.username) {
    return undefined;
  }

  return {
    username: String(payload.username),
    roles: Array.isArray(payload.roles) ? payload.roles.map(String) : undefined,
    displayName: payload.displayName ? String(payload.displayName) : undefined,
  };
}
