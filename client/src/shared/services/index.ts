export * from './auth.service';
import type { ErrorApiInterface } from '@/shared/interfaces';

export const errorFor = function (field:String, errors:ErrorApiInterface[] ){
    const error  = errors.find((e) => e.field === field);
    if (error) {
      return error.message;
    } else {
      return undefined;
    }
  };