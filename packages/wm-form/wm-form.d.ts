import { LitElement } from 'lit';
export declare const tagName = "wm-form";
export declare class WebmarketsForm extends LitElement {
    static styles: import("lit").CSSResult;
    formSparkID: string;
    _name: string;
    _email: string;
    _phone: string;
    _message: string;
    _referralSource: string;
    _getFormattedDate(): string;
    _postSubmission(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=wm-form.d.ts.map