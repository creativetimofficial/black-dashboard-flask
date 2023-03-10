import { PropertyCollection } from "../sdk/Exports";
import { Context } from "./Exports";
export declare class SpeakerRecognitionConfig {
    private privParameters;
    private privContext;
    constructor(context: Context, parameters: PropertyCollection);
    get parameters(): PropertyCollection;
    get Context(): Context;
}
