import * as MainActions from "./main.actions";
import { Project } from "./models/project";
import { Layer } from "./models/layer";

export class MainState {
    loading: boolean;
    currentSideMenu: string;
    currentParentView: string;
    currentChildView: string;
    projects: Project[];
    currentProjectId: number;
    currentProject: Project;
    projectLayers: Layer[];
    systemLayers: Layer[];
    tool: string;
    editMode: string;
}

const initialState: MainState = {
    loading: false,
    currentSideMenu: null,
    currentParentView: "Map",
    currentChildView: "",
    projects: [],
    currentProjectId: -1,
    currentProject: {
        id: -1,
        name: "",
        saved: false
    },
    projectLayers: [],
    systemLayers: [],
    tool: null,
    editMode: null
}

export function reducer(state: MainState = initialState, action: MainActions.Actions) {
    console.log("ACTION", action);
    switch(action.type) {
        case MainActions.CREATE_PROJECT:
            return { ...state,
                loading: true,
            };
        case MainActions.CREATE_PROJECT_SUCCESS:
            return { ...state,
                loading: false,
                projects: [...state.projects, action.payload],
            };
        case MainActions.GET_PROJECTS:
            return { ...state,
                loading: true,
            };
        case MainActions.GET_PROJECTS_SUCCESS:
            return { ...state,
                loading: false,
                projects: action.payload
            };
        case MainActions.OPEN_PROJECT:
            return { ...state,
                loading: true,
                currentProjectId: action.payload.id,
                currentProject: { ...action.payload }
            };
        case MainActions.UPDATE_PROJECT:
            return { ...state,
                loading: true,
                currentProject: action.payload(state.currentProject)
            };
        case MainActions.SAVE_PROJECT:
            return { ...state,
                loading: true,
            };
        case MainActions.SAVE_PROJECT_SUCCESS:
            return { ...state,
                loading: false,
            };
        case MainActions.CREATE_LAYER:
            return { ...state,
                loading: true,
            };
        case MainActions.CREATE_LAYER_SUCCESS:
            return { ...state,
                projectLayers: [...state.projectLayers, action.payload],
                loading: false,
            };
        case MainActions.UPLOAD_LAYER:
            return { ...state,
                loading: true,
            };
        case MainActions.UPLOAD_LAYER_SUCCESS:
            let newState = { ...state, loading: false };
            if (action.payload.isSystemLayer) {
                newState.systemLayers = newState.systemLayers.concat(action.payload)
            } else {
                newState.projectLayers = newState.projectLayers.concat(action.payload)
            }
            return newState;
        case MainActions.GET_SYSTEM_LAYERS:
            return { ...state,
                loading: true,
            };
        case MainActions.GET_SYSTEM_LAYERS_SUCCESS:
            return { ...state,
                systemLayers: state.systemLayers.concat(action.payload),
                loading: false,
            };
        case MainActions.GET_PROJECT_LAYERS:
            return { ...state,
                loading: true,
            };
        case MainActions.GET_PROJECT_LAYERS_SUCCESS:
            return { ...state,
                projectLayers: state.projectLayers.concat(action.payload),
                loading: false,
            };
        case MainActions.SELECT_TOOL:
            return { ...state,
                tool: action.payload
            };
        case MainActions.SELECT_EDIT_MODE:
            return { ...state,
                editMode: action.payload
            };
        case MainActions.ADD_MAP_PIN:
            return { ...state };
        case MainActions.ADD_MAP_PIN_SUCCESS:
            return { ...state };
        case MainActions.SIDE_MENU_CHANGED:
            return { ...state,
                currentSideMenu: action.payload
            };
        case MainActions.CHANGE_PARENT_VIEW:
            return { ...state,
                currentParentView: action.payload
            };
        case MainActions.CHANGE_CHILD_VIEW:
            return { ...state,
                currentChildView: action.payload
            };
        default:
            return state;
    }
}