import { 
    ReposComponent
} from './';
import { RepoRouteActivatorService } from './../shared';

export const reposRoutes = [
    { path: '', component: ReposComponent },
    { path: 'repo', component: ReposComponent },
]