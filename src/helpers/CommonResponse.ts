/**
 * Common response class
 * @param data
 * @param error
 * @constructor
 * @returns {CommonResponse}
 * @example
 * const response = new CommonResponse({data: []}); // init common response and set fallback data
 * 
 * const data = [
 *  {id: 1, name: 'test'}
 * ]
 * 
 * response.send(data);
 * console.log(response) // {data: [{id: 1, name: 'test'}], error: {isBusted: false, message: ''}}
 * 
 * const error = response.sendError({message: 'test'});
 * console.log(error) // {data: [], error: {isBusted: true, message: 'test'}}
 */
export class CommonResponse {
  data: any[];
  error: { status: boolean; message: string; code: string };
  success: boolean = true;

  constructor(data: { data: any[]; error: { status: boolean; message: string; code: string; } }) {
    this.data = data.data;
    this.error = data.error;
  }

  send(data: any[]) {
    this.data = data;
    return this;
  }

  sendError(error: { status: boolean; message: string; code: string; }) {
    this.error = error;
    return this;
  }
}