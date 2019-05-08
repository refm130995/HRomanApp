
export interface Inspector{
    dni:string;
    nombres:string;
    apellidos:string;
    email:number;
    contraseña:string;
    photoUrl:string;
    historial:Historial[];
}
export interface Historial{
    fecha:Date;
    cliente: Cliente;
    inspeccion: Inspeccion;
}
export interface Cliente{
    nombre: string;
    contrato: Contrato;
}
export interface Contrato{
    key_disp: string;
    fecha_inicio: Date;
    fecha_finalizacion: Date;
}
export interface Inspeccion{
    tipo: string;
    fecha: string;
    photoUrl:string;
    //form: Form; Nota: Aun por definir.
}
export interface InspectorLogin{
    email:number;
    contraseña:string;
}
export interface user_{
    email?:string;
    password:string;
    firstname?:string;
    lastname?:string;
    phone?:number;
    role:'Empleado';
}