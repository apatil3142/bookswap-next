import {formatDistance} from 'date-fns';
import { enUS } from 'date-fns/locale';

export const getTimeSince = (date: string) => {
  try{
    if(date){
      const result = formatDistance(new Date(date), new Date(), {
        locale: enUS, addSuffix: true, includeSeconds: true
      });

      const resultStr = (result.charAt(0).toUpperCase() + result.slice(1));
      return resultStr;
    }
  }catch(err){
    console.log(err);
    return '-';
    
  }
}