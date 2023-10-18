import {createContext} from 'react';
import {DESKTOP_RESOLUTION, OLDDESKTOP_RESOLUTION, MOBILE_RESOLUTION, TABLET_RESOLUTION} from "../utils/constants";

export const deviceWidth = {
  desktop: DESKTOP_RESOLUTION,
  olddesktop: OLDDESKTOP_RESOLUTION,
  tablet: TABLET_RESOLUTION,
  mobile: MOBILE_RESOLUTION
}
export const WindowSizeContext = createContext('desktop');
