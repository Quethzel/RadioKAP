import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class RadioInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private radioGroup: HTMLDivElement;
    private yesRadio: HTMLInputElement;
    private noRadio: HTMLInputElement;
    private value: number | undefined;

    private notifyOutputChanged: () => void;

    constructor()
    {

    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.context = context;
        this.radioGroup = document.createElement("div");

        // Build Yes radio button
        this.yesRadio = document.createElement("input");
        this.yesRadio.type = "radio";
        this.yesRadio.name = "radioOptions";
        this.yesRadio.value = "1";
        this.yesRadio.id = "yesRadio";
        this.yesRadio.onclick = () => this.onRadioChange(1);
        this.yesRadio.checked = false;

        const yesLabel = document.createElement("label");
        yesLabel.htmlFor = "yesRadio";
        yesLabel.appendChild(document.createTextNode("Yes"));

        // Build No radio button
        this.noRadio = document.createElement("input");
        this.noRadio.type = "radio";
        this.noRadio.name = "radioOptions";
        this.noRadio.value = "0";
        this.noRadio.id = "noRadio";
        this.noRadio.onclick = () => this.onRadioChange(0);

        const noLabel = document.createElement("label");
        noLabel.htmlFor = "noRadio";
        noLabel.appendChild(document.createTextNode("No"));

        // Add radio buttons to the radio group
        this.radioGroup.appendChild(this.yesRadio);
        this.radioGroup.appendChild(yesLabel);
        this.radioGroup.appendChild(this.noRadio);
        this.radioGroup.appendChild(noLabel);

        this.initializeRadioButtons();

        // Append the radio group to the container
        container.appendChild(this.radioGroup);
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {

    }

    public getOutputs(): IOutputs
    {
        console.log("getOutputs: ", this.value);        
        return {
            controlValue: this.value
        };
    }

    public destroy(): void
    {
        
    }

    private initializeRadioButtons(): void {
        if (this.context.parameters.controlValue.raw !== undefined) {
            const initialValue = this.context.parameters.controlValue.raw;

            if (initialValue === 1) {
                this.yesRadio.checked = true;
                this.value = 1;
            } else if (initialValue === 0) {
                this.noRadio.checked = true;
                this.value = 0;
            } else {
                this.value = undefined;
            }
        }
    }

    private onRadioChange(value: number): void {
        this.value = value;
        this.notifyOutputChanged();
    }
}
