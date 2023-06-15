import type { ErrorApiInterface } from "../interfaces";



const BASE_URL = '/api/';



/**
 * Représente une erreur renvoyé par l'api
 * 
 */

export class ApiErrors {
    errors :ErrorApiInterface[]
    constructor(errors:ErrorApiInterface[]) {
      this.errors = errors;
    }
    get errorsPerField() {
      return this.errors.reduce((acc, error) => {
        return { ...acc, [error.field]: error.message };
      }, {});
    }
  }

export async function apiFetch(endpoint:string, options :any= {}) {
    options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      ...options,
    };
    if (
      options.body != null &&
      typeof options.body == "object" &&
      !(options.body instanceof FormData)
    ) {
      options.body = JSON.stringify(options.body);
      options.headers["Content-type"] = "application/json";
    }
    const response = await fetch(BASE_URL + endpoint, options);
    const responseData = await response.json();
    

    if (response.ok) {

      return responseData;
    } else {
      if (responseData.errors) {
        throw new ApiErrors(responseData.errors);
      }
    }
  }