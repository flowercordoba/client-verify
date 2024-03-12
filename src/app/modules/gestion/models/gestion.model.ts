import { IGestion } from "../interfaces/gestion.interface";

export class GestionModel implements IGestion {
    ventasNetas: number;
    patrimonioLiquido: number;
    activoTotal: number;
    activoCorriente: number;
    pasivoCorriente: number;
    cuentasPorCobrarClientes: number;
    rotacionPatrimonioNeto: number;
    nombre: string;
    descripcion: string;
    rotacionActivoTotal: number;
    rotacionCapitalTrabajo: number;
    rotacionCartera: number;
    periodoCobro: number;
    eficienciaOperativa: number;
    empresaId: string;
    userId: string;
    fecha: string;
    riesgoPais: number;
  
    constructor(datos: IGestion) {
      this.ventasNetas = datos.ventasNetas;
      this.patrimonioLiquido = datos.patrimonioLiquido;
      this.activoTotal = datos.activoTotal;
      this.activoCorriente = datos.activoCorriente;
      this.pasivoCorriente = datos.pasivoCorriente;
      this.cuentasPorCobrarClientes = datos.cuentasPorCobrarClientes;
      this.rotacionPatrimonioNeto = datos.rotacionPatrimonioNeto;
      this.nombre = datos.nombre;
      this.descripcion = datos.descripcion;
      this.rotacionActivoTotal = datos.rotacionActivoTotal;
      this.rotacionCapitalTrabajo = datos.rotacionCapitalTrabajo;
      this.rotacionCartera = datos.rotacionCartera;
      this.periodoCobro = datos.periodoCobro;
      this.eficienciaOperativa = datos.eficienciaOperativa;
      this.empresaId = datos.empresaId;
      this.userId = datos.userId;
      this.fecha = datos.fecha;
      this.riesgoPais = datos.riesgoPais;
    }
    
  }
  