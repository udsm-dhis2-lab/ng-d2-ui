import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding d2 ui library into the application');
    const modulePath = '/src/app/app.module.ts';
    if (!tree.exists(modulePath)) {
      throw new SchematicsException(`The file ${modulePath} does not exist`);
    }
    const recorder = tree.beginUpdate(modulePath);
    const text = tree.read(modulePath);

    if (!text) {
      throw new SchematicsException(`The file ${modulePath} does not exist`);
    }

    const source = ts.createSourceFile(
      modulePath,
      text.toString(),
      ts.ScriptTarget.Latest,
      true
    );

    applyToUpdateRecorder(
      recorder,
      addImportToModule(source, modulePath, 'NgD2UiModule', '@iapps/ng-d2-ui')
    );

    tree.commitUpdate(recorder);

    context.logger.info('Installing dependencies');
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
