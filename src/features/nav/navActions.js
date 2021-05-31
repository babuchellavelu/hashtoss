import  {FETCH_MENU} from '../nav/navConstants';

export function listenToMenu(menu){
      return {
                type: FETCH_MENU,
        payload:menu
    }
}
