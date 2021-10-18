import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesPageModule),
      },
      {
        path: 'detail',
        loadChildren: () => import('./pages/movies/detail/detail.module').then(m => m.DetailPageModule),
      },
      {
        path: 'edit',
        loadChildren: () => import('./pages/movies/edit/edit.module').then(m => m.EditPageModule)
      },
      {
        path: 'discover',
        loadChildren: () => import('./pages/movies/discover/discover.module').then(m => m.DiscoverPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
