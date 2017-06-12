import { SecurityModel } from './security.model';
import { UserStateModel } from './user.model';

export class AppStateModel {
    user: UserStateModel = new UserStateModel();
    security: SecurityModel = new SecurityModel();
}
