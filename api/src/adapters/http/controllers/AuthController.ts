import { Request, Response, NextFunction } from 'express';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { LoginUser } from '../../../application/use-cases/LoginUser';
import { AssignUserClientAccess } from '../../../application/use-cases/AssignUserClientAccess';
import { AddUserRoles } from '../../../application/use-cases/AddUserRoles';
import { RemoveUserRoles } from '../../../application/use-cases/RemoveUserRoles';
import { GetUserRoles } from '../../../application/use-cases/GetUserRoles';
import { SignOutUser } from '../../../application/use-cases/SignOutUser';
import { AuthenticatedRequest } from '../middlewares/authorization';
import { AppError, ErrorCodes } from '../../../shared/errors/AppError';

export class AuthController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly loginUser: LoginUser,
    private readonly assignUserClientAccess: AssignUserClientAccess,
    private readonly addUserRoles: AddUserRoles,
    private readonly removeUserRoles: RemoveUserRoles,
    private readonly getUserRolesUseCase: GetUserRoles,
    private readonly signOutUser: SignOutUser
  ) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, roles } = req.body as { username: string; password: string; roles: string[] };
      const result = await this.createUser.execute({ username, password, roles });
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, clientId } = req.body as { username: string; password: string; clientId: string };
      const result = await this.loginUser.execute({ username, password, clientId });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authenticatedRequest = req as AuthenticatedRequest;
      const auth = authenticatedRequest.auth;

      if (!auth) {
        throw new AppError({
          code: ErrorCodes.UNAUTHORIZED,
          message: 'Authentication token is required',
          status: 401
        });
      }

      const result = await this.signOutUser.execute({
        userId: auth.userId,
        sessionId: auth.sessionId
      });

      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  assignClientAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { users } = req.body as { users: Array<{ username: string; clientIds: string[] }> };
      const result = await this.assignUserClientAccess.execute({ users });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  addRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, roles } = req.body as { username: string; roles: string[] };
      const result = await this.addUserRoles.execute({ username, roles });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  removeRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, roles } = req.body as { username: string; roles: string[] };
      const result = await this.removeUserRoles.execute({ username, roles });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  getUserRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.params as { username: string };
      const result = await this.getUserRolesUseCase.execute({ username });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
