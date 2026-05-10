import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },

	{
		path: 'auth',
		loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule),
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
	},

	{
		path: 'profile',
		loadChildren: () => import('./user/user-module').then(m => m.UserModule),
	},

		{
	path: 'bookclubs',
	loadChildren: () =>
		import('./bookclubs/bookclubs-module').then(m => m.BookclubsModule),
	},

		{
	path: 'categories',
	loadChildren: () =>
		import('./categories/categories-module').then(m => m.CategoriesModule),
	},

		{
	path: 'ratings',
	loadChildren: () =>
		import('./ratings/ratings-module').then(m => m.RatingsModule)
	},

	{
  	path: 'bookclubs/:bookclubId/books/:bookId/ratings',
  	loadChildren: () =>
    import('./ratings/ratings-module').then(m => m.RatingsModule)
},
 
   //Manage path errors
	{ path: '**', redirectTo: 'auth/login' },
];