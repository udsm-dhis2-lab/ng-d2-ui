import { Component } from '@angular/core';
import { Button, Card, HeaderBar, Input } from '@dhis2/ui';
import { ComponentProps } from 'react';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  HeaderBar = HeaderBar;
  Button = Button;
  Input = Input;
  Card = Card;

  title = 'demo';
  selectProps: ComponentProps<any> = {
    onClick(v: any) {
      console.log(v);
    },
    onChange(v: any) {},
    name: 'Button',
    id: 'orgunit',
    displayName: 'name',
    value: 'Button',
    root: 'root',
    rootId: 'root',
    path: 'path',
    label: 'First name',
    placeholder: 'Enter name',
    options: [
      {
        label: 'string',
        value: 'string',
        disabled: false,
      },
    ],
  };
}
