import { mapValues } from "../service/shared";
import treeNegative2 from '../assets/trees/-2.png'
import treeNegative1 from '../assets/trees/-1.png'
import treePositive1 from '../assets/trees/1.png'
import treePositive2 from '../assets/trees/2.png'
import treeNatural0 from '../assets/trees/0.png'
import handwave from '../assets/handwave.png'

export const classesLetters = {
  1: 'א',
  2: 'ב',
  3: 'ג',
  4: 'ד',
  5: 'ה',
  6: 'ו',
}


export const treesStatesDic = {
  "-2": treeNegative2,
  "-1": treeNegative1,
  // 0: treeNatural0,
  0: handwave,
  1: treePositive1,
  2: treePositive2,
};