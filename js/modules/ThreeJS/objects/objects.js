import SPLINT from 'SPLINT';
import * as THREE from 'threeJS';
import Plane from './plane.js';

export default class OBJECT {
    static Plane(width, height, wS, hS) {
        return new Plane(width, height, wS, hS);
    }
}