export interface IGestion {
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

  }
   export interface Gestion {
    _id: string;
    rotacionPatrimonioNeto: number;
    rotacionActivoTotal: number;
    rotacionCapitalTrabajo: number;
    rotacionCartera: number;
    periodoCobro: number;
    eficienciaOperativa: number;
    empresaId: string | Empresa | null;
    userId: Usuario;
    fecha: string;
    riesgoPais: number;
  }
  
 export interface Empresa {
    _id: string;
    nombre: string;
    repLegal: string;
    // Agrega aquí más campos según sea necesario
  }
  
  interface Usuario {
    _id: string;
    name: string;
    email: string;
    // Agrega aquí más campos según sea necesario
  }
  
  interface PaginacionRespuesta {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    gestiones: Gestion[];
  }
  
  // Esta interfaz es útil si tienes un endpoint específico para detalles de empresa
  interface DetalleEmpresaRespuesta {
    _id: string;
    nombre: string;
    nit: string;
    repLegal: string;
    // Agrega aquí más detalles según tu modelo de Empresa
  }
  

  export interface GestionesRespuesta {
    gestiones: Gestion[];
    total: number;
  }