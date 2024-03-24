namespace Configs {
  export namespace Callback {
   export namespace ValidatonConfig {
      export type BasicObj = {
        name: string;
        args: any[];
      };
    }
    export namespace HtmlElementConfig {
      type Basic = {
        tag: string;
      };

      export type SelectElement = Basic & {
        tag: "select";
        options: { text: string; value: string }[];
      };
      export type InputElement = Basic & {
        tag: "input";
        attributes: { [key: string]: string } & { type: string };
      };
      export type Elements = SelectElement | InputElement;
    }

    export namespace PropertiesConfig {
      export type Basic = {
        value: string | string[] | { [key: string]: PropertiesConfig.Basic };
        type: string;
        required: boolean;
        validations: ValidatonConfig.BasicObj[];
      } & (
        | { default: string; htmlElement: HtmlElementConfig.Elements }
        | {
            default: null;
            htmlElement: null;
          }
      );
    }

    export type Config = {
      event: PropertiesConfig.Basic & {
        default: string;
        htmlElement: HtmlElementConfig.SelectElement;
      };
      function: PropertiesConfig.Basic & {
        default: string;
        htmlElement: HtmlElementConfig.InputElement;
      };
      args: PropertiesConfig.Basic & {
        value: {
          [key: PropertyKey]: PropertiesConfig.Basic & {
            default: string;
            htmlElement: HtmlElementConfig.Elements;
          };
        };
        default: null;
        htmlElement: null;
      };
    };
  }
}
export type BasicValidationConfig = Configs.Callback.ValidatonConfig.BasicObj;
export type CallbackConfig = Configs.Callback.Config;
