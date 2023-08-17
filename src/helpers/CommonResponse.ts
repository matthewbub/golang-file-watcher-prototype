/**
 * Common response class
 * @param data
 * @param error
 * @constructor
 * @returns {CommonResponse}
 * @example
 * const response = new CommonResponse({data: {}}); // init common response and set fallback data
 * 
 * const data = {id: 1, name: 'test'}
 * 
 * response.send(data);
 * console.log(response) // {data: {id: 1, name: 'test'}, error: {isSuccessful: false, message: '', code: '', meta: {}}}
 * 
 * const error = response.sendError({message: 'test'});
 * console.log(error) // {data: {}, error: {isSuccessful: true, message: 'test', code: '', meta: {}}}
 */
export class CommonResponse {
  data: any;
  error: { isSuccessful: boolean; message: string; code: string; meta?: any };
  success: boolean = true;

  constructor(data: { data: any; error?: { isSuccessful: boolean; message: string; code: string; meta?: any } }) {
    this.data = data.data;
    this.error = data.error || {
      isSuccessful: false,
      message: '',
      code: '',
      meta: {}
    };
  }

  send(data: any) {
    this.data = data;
    this.error = {
      isSuccessful: true,
      message: '',
      code: '',
      meta: {}
    }
    return this;
  }

  sendError(error: { isSuccessful: boolean; message: string; code: string; meta?: any }) {
    this.error = error;
    return this;
  }
}
