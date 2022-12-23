import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { DataProvider } from "@dhis2/app-runtime";
import parse from "html-react-parser";
import * as React from "react";
import { ComponentProps } from "react";
import * as ReactDOM from "react-dom/client";

@Component({
  selector: "d2-ui-wrapper",
  template: "<ng-content></ng-content>",
})
export class D2UIWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @Input() props?: ComponentProps<any>;
  @Input() component!: React.ElementType;
  @Input() requireDataProvider?: boolean = true;

  @ContentChild("d2UiContent") content!: ElementRef<HTMLElement>;
  private reactDomRoot?: ReactDOM.Root;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (!this.elementRef) throw new Error("No element ref");
    this.reactDomRoot = ReactDOM.createRoot(this.elementRef.nativeElement);
    this.render();
  }

  ngOnChanges(): void {
    if (this.elementRef) this.render();
  }

  ngOnDestroy() {
    this.reactDomRoot?.unmount();
  }

  private render() {
    if (!this.component) throw new Error("React component must be supplied");

    if (!this.reactDomRoot) return;

    const jsxContent = this.content?.nativeElement?.outerHTML
      ? parse(this.content?.nativeElement?.outerHTML)
      : undefined;

    this.reactDomRoot.render(
      <React.Fragment>
        {this.requireDataProvider ? (
          <DataProvider>
            {
              <this.component {...this.props}>
                {" "}
                {jsxContent || ""}{" "}
              </this.component>
            }
          </DataProvider>
        ) : (
          <this.component {...this.props}> {jsxContent || ""} </this.component>
        )}
      </React.Fragment>
    );
  }
}
