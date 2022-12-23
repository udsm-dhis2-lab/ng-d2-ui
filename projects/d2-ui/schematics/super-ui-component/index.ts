import { normalize, strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  url,
  externalSchematic,
  MergeStrategy,
} from '@angular-devkit/schematics';
import { SuperUiComponentSchema } from './super-component';
export function superUiComponentGenerator(
  options: SuperUiComponentSchema
): Rule {
  return () => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasharize: strings.dasherize,
        name: options.name,
      }),
      move(normalize(`/${options.path}/${strings.dasherize(options.name)}`)),
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  };
}
