import { onRequestGet as __api_cancel_prediction_js_onRequestGet } from "/Users/emilio/Documents/snapzeditor/functions/api/cancel-prediction.js"
import { onRequestPost as __api_create_prediction_js_onRequestPost } from "/Users/emilio/Documents/snapzeditor/functions/api/create-prediction.js"
import { onRequestGet as __api_get_prediction_js_onRequestGet } from "/Users/emilio/Documents/snapzeditor/functions/api/get-prediction.js"

export const routes = [
    {
      routePath: "/api/cancel-prediction",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_cancel_prediction_js_onRequestGet],
    },
  {
      routePath: "/api/create-prediction",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_prediction_js_onRequestPost],
    },
  {
      routePath: "/api/get-prediction",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_get_prediction_js_onRequestGet],
    },
  ]