
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap, Observable, of, tap } from "rxjs";
import { IPersonal } from "../personal.model";
import { PersonalService } from "../personal.service";
import * as personalActions from './personal.action'

@Injectable()
export class PersonalEffect {

  loadPersonal$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(
        personalActions.PersonalActionTypes.LOAD_PERSONAL
      ),
      mergeMap((action: personalActions.PersonalActionTypes) => 
      this.personalService.getPersonal().pipe(
        map((personal: IPersonal[]) => personalActions.loadPersonalSuccess({personal})),
        catchError((err ) => of(personalActions.loadPersonalFail(err)))
      ))
    )
  )

  constructor(
    private actions$: Actions,
    private personalService: PersonalService
  ){}
}
