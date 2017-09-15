import { 
    ReposComponent, 
    RepoUserComponent 
} from './';
import { RepoRouteActivatorService } from './../shared';

export const reposRoutes = [
    { path: 'repo', component: ReposComponent },
    { path: 'repo/:id', component: RepoUserComponent, canActivate: [RepoRouteActivatorService] },
]