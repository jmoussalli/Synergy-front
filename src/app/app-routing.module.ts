import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: '', pathMatch: "full"},
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {
    path: 'channels',
    loadChildren: () =>
      import('./channels/channels.module').then((m) => m.ChannelsModule),
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
