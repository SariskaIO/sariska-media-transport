/**
 * Creates a new instance of JitsiStreamBackgroundEffect. This loads the Meet background model that is used to
 * extract person segmentation.
 *
 * @param {Object} virtualBackground - The virtual object that contains the background image source and
 * the isVirtualBackground flag that indicates if virtual image is activated.
 * @param {Function} dispatch - The Redux dispatch function.
 * @returns {Promise<JitsiStreamBackgroundEffect>}
 */
export function createVirtualBackgroundEffect(virtualBackground: any, dispatch: Function): Promise<JitsiStreamBackgroundEffect>;
import JitsiStreamBackgroundEffect from "./JitsiStreamBackgroundEffect";
