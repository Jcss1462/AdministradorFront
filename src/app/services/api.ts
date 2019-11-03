//servicios
import{LoginService} from '../services/login/login.service';
import{RecuperacionService} from '../services/recuperacion/recuperacion.service';
import{UssersService} from '../services/ussers/ussers.service';
import{EntidadesService} from '../services/entidades/entidades.service';
import{TrabajadorEntidadService} from '../services/trabajador_entidades/trabajador-entidad.service';
import{SucursalService} from '../services/sucursales/sucursal.service';
import{ProyectosService} from '../services/proyectos/proyectos.service';
import{FasesService} from '../services/fases/fases.service';


//objetos
import{Data} from '../services/login/data';
import{Email} from '../services/recuperacion/email';
import{Usserinfo} from '../services/ussers/usserinfo';
import{Usserdata} from '../services/ussers/usserdata';
import{Entidad} from '../services/entidades/entidad';
import{GetEntidad} from '../services/entidades/getEntidad';
import{Traent} from '../services/trabajador_entidades/traent';
import{SucursalInfo} from '../services/sucursales/sucursalInfo';
import{Newsucursal} from '../services/sucursales/newSucursal';
import{ProyectosInfo} from '../services/proyectos/proyectsInfo';
import{NuevoProyecto} from '../services/proyectos/nuevoProyecto';
import{Fasesinfo} from '../services/fases/fasesInfo';
import{NewFase} from '../services/fases/newFase';



export{

    //servicios
    LoginService,
    RecuperacionService,
    UssersService,
    EntidadesService,
    TrabajadorEntidadService,
    SucursalService,
    ProyectosService,
    FasesService,

    //objetos
    Data,
    Email,
    Usserinfo,
    Usserdata,
    Entidad,
    GetEntidad,
    Traent,
    SucursalInfo,
    Newsucursal,
    ProyectosInfo,
    NuevoProyecto,
    Fasesinfo,
    NewFase
   
};