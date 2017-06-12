export class ErrorManager {

    fieldErrors: {[name: string]: string[]} = {};
    formErrors: string[] = [];

    static createFromResponse(errors: any) {
        let errorManager = new ErrorManager();

        if (errors) {
            for (let key in errors) {
                if (errors.hasOwnProperty(key) && key !== 'children') {
                    errorManager.formErrors.push(errors[key]);
                }
            }
        }

        if (errors.children) {
            for (let errorName in errors.children) {
                if (errors.children.hasOwnProperty(errorName)) {
                    if (!Array.isArray(errorManager.fieldErrors[errorName])) {
                        errorManager.fieldErrors[errorName] = [];
                    }
                    if (errors.children[errorName] && Array.isArray(errors.children[errorName].errors)) {
                        errors.children[errorName].errors.forEach((item: any) => {
                            errorManager.fieldErrors[errorName].push(item);
                        });
                    } else if (!(Array.isArray(errors.children[errorName]) && errors.children[errorName].length === 0)) {
                        throw new Error(`Error children for field ${errorName} is not an array`);
                    }
                }
            }
        }

        return errorManager;
    }

    getErrors(fieldName: string): string[] {
        if (fieldName === undefined) {
            return this.formErrors;
        }
        if (Array.isArray(this.fieldErrors[fieldName])) {
            return this.fieldErrors[fieldName];
        }
        return [];
    }
}
