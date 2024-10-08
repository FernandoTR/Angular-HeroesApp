import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, GuardResult, MaybeAsync, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthSatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
          .pipe(
            tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
            tap( isAuthenticated => {
              if ( !isAuthenticated) this.router.navigate(['/auth/login'])
            })
          );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    // console.log('Can Match');

    // console.log(route, segments);

    // return of(true);

    return this.checkAuthSatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    // console.log('Can Activate');

    // console.log(route,state);

    // return of(true);
    return this.checkAuthSatus();

  }

}
