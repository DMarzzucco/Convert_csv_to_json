export class TaskValidator {
    validate(row: Record<string, string>): boolean {
        const { Nombre, Edad, Departamento, Email } = row;
        return !!(Nombre && Edad && Departamento && Email);
    }
}