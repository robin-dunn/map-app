import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as MainActions from "./main.actions";
import { ApiService } from "./api.service";
import { Project } from "./models/project";

@Injectable()
export class MainEffects {
  constructor(private actions: Actions, private apiService: ApiService) {}

  @Effect() /* CREATE_PROJECT */
  createProject = this.actions.pipe(
    ofType<MainActions.CreateProject>(MainActions.CREATE_PROJECT),
    switchMap((action) => {
      return this.apiService.createProject(action.payload).pipe(
        map((project) => new MainActions.CreateProjectSuccess(project))
      );
    })
  );

  @Effect() /* GET_PROJECTS */
  getProjects = this.actions.pipe(
    ofType(MainActions.GET_PROJECTS),
    switchMap((action) => {
      return this.apiService.getProjects().pipe(
        map((data:Project[]) => new MainActions.GetProjectsSuccess(data)),
        catchError(error =>
          of(new MainActions.GetProjectsFailure({ error: error }))
        )
      );
    })
  );

  @Effect() /* ADD_MAP_PIN */
  addMapPin = this.actions.pipe(
    ofType<MainActions.AddMapPin>(MainActions.ADD_MAP_PIN),
    switchMap((action) => {
      return this.apiService.addMapPin(action.payload).pipe(
        map((mapPin) => new MainActions.AddMapPinSuccess(mapPin))
      );
    })
  );

  @Effect() /* CREATE_LAYER */
  createLayer = this.actions.pipe(
    ofType<MainActions.CreateLayer>(MainActions.CREATE_LAYER),
    switchMap((action) => {
      return this.apiService.createLayer(action.payload.projectId).pipe(
        map((layer) => new MainActions.CreateLayerSuccess(layer))
      );
    })
  );
}