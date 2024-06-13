import { CallbackObj } from "../../types";
export type CallbackProps = {
    id?: string;
    eventName?: string;
    functionName: string;
    args: Record<string, any>;
};
/**
 * Callbacks are objects associated with steps, defining actions to occur after specific events in a step's lifecycle.
 * For example, imagine that after a step is marked as completed, the function `sendEmail` should be called.
 * The callback object would contain:
 * - The event name (e.g., step completion)
 * - The function name (e.g., sendEmail)
 * - A description of the acceptable arguments that the function `sendEmail` should receive
 *
 * In the context of front-end development, the callback object could be used to create a button that, when clicked, calls the `sendEmail` function.
 *
 * Additionally, descriptors within the callback object provide context on how to display certain components related to the callback.
 * The `eventLabelObj` is used to associate the event with a label component, aiding in the display and user interaction.
 */
declare class Callback {
    id: string;
    eventName: string;
    functionName: string;
    args: Record<string, any>;
    constructor({ id, eventName, functionName, args }: CallbackProps);
    updateEvent(event: string): void;
    updateArgs(args: Record<string, any>): void;
    update({ functionName, eventName, args }: Partial<Callback>): void;
    get type(): string;
    toJSON(): CallbackObj;
}
export default Callback;
