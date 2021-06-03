import React from "react";

export default class Cookies extends React.Component {
  desplazarIndice(id) {
    var elemento = document.getElementById(id);
    var posicion = elemento.getBoundingClientRect();
    window.scrollTo(0, posicion.top - 200);
  }

  render() {
    return (
      <div className="container-fluid fondo">
        <div className="container" id="contenido">
          <div className="row">
            <div
              className="col-12 col-md-9 col-lg-7 mx-auto py-5 px-5 my-5 text-white"
              id="politicas"
            >
              <h2>POLÍTICAS DE PRIVACIDAD</h2>
              <ul className="pl-2 pl-md-5 pt-2 indice">
                <li>
                  <a
                    onClick={() => this.desplazarIndice("finalidades")}
                    className="enlaceWeb"
                  >
                    Finalidades – ¿con qué finalidades tratamos tus datos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("categorias")}
                    className="enlaceWeb"
                  >
                    Categorías de datos – ¿Qué datos tratamos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("legitimacion")}
                    className="enlaceWeb"
                  >
                    Legitimación – ¿cuál es la legitimación para el tratamiento
                    de tus datos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("plazo")}
                    className="enlaceWeb"
                  >
                    Plazo de Conservación de los Datos – ¿Por cuánto tiempo
                    conservaremos tus datos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("destinatarios")}
                    className="enlaceWeb"
                  >
                    Destinatarios ¿A qué destinatarios se comunicarán tus datos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("seguridad")}
                    className="enlaceWeb"
                  >
                    Seguridad de la Información – ¿Qué medidas de seguridad
                    implantamos para cuidar sus datos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("derechos")}
                    className="enlaceWeb"
                  >
                    Derechos – ¿Cuáles son tus derechos cuando nos facilitas tus
                    datos y cómo puedes ejercerlos?
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("modificaciones")}
                    className="enlaceWeb"
                  >
                    Modificación de la política de privacidad
                  </a>
                </li>
              </ul>
              <div title="Volver arriba" class="icono_volver_arriba">
                <a href="#">
                  <i class="fas fa-chevron-circle-up"></i>
                </a>
              </div>
              <h2 className="pt-5" id="responsable">
                Responsable – ¿quién es el responsable del tratamiento de los
                datos?
              </h2>
              <p className="text-justify">Identidad: BYCIRYDE</p>
              <p className="text-justify">Domicilio social: C/Calle</p>
              <p className="text-justify">DNI: 79622374P</p>
              <p className="text-justify">Teléfono: 111222333</p>
              <p className="text-justify">Correo Electrónico: correo@gmail.com</p>
              <p className="text-justify">Contacto: Nombre Apellidos</p>
              <p className="text-justify">Nombre del dominio: BYCIRYDE.es</p>

              <h2 className="pt-4" id="finalidades">
                Finalidades – ¿con qué finalidades tratamos tus datos?
              </h2>
              <p className="text-justify">
                En cumplimiento de lo dispuesto en el Reglamento Europeo
                2016/679 General de Protección de Datos, te informamos de que
                trataremos los datos que nos facilitas para:
              </p>
              <ul className="lista pl-4">
                <li className="text-justify">
                  Gestionar la contratación de servicios que realice a través de
                  la Plataforma, así como la facturación y entrega
                  correspondiente.
                </li>
                <li className="text-justify">
                  Remitir periódicamente comunicaciones sobre servicios, eventos
                  y noticias relacionadas con las actividades desarrolladas por
                  BYCIRYDE, por cualquier medio (teléfono, correo postal o
                  email), salvo que se indique lo contrario o el usuario se
                  oponga o revoque su consentimiento.
                </li>
                <li className="text-justify">
                  Remitir información comercial y / o promocional relacionada
                  con el sector de servicios contratados y valor añadido para
                  usuarios finales, salvo que se indique lo contrario o el
                  usuario se oponga o revoque su consentimiento.
                </li>
                <li className="text-justify">
                  Dar cumplimiento a las obligaciones legalmente establecidas,
                  así como verificar el cumplimiento de las obligaciones
                  contractuales, incluía la prevención de fraude.
                </li>
                <li className="text-justify">
                  Cesión de datos a organismos y autoridades, siempre y cuando
                  sean requeridos de conformidad con las disposiciones legales y
                  reglamentarias.
                </li>
              </ul>

              <h2 className="pt-4" id="categorias">
                Categorías de datos – ¿Qué datos tratamos?
              </h2>
              <p className="text-justify">
                Derivada de las finalidades antes mencionadas, en BYCIRYDE
                gestionamos las siguientes categorías de datos:
              </p>
              <ul className="lista pl-4">
                <li className="text-justify">Datos identificativos</li>
                <li className="text-justify">Metadatos de comunicaciones electrónicas</li>
                <li className="text-justify">
                  Datos de información comercial. En caso de que el usuario
                  facilite datos de terceros, manifiesta contar con el
                  consentimiento de estos y se compromete a trasladarle la
                  información contenida en esta cláusula, eximiendo a BYCIRYDE
                  de cualquier responsabilidad en este sentido.
                </li>
                <li className="text-justify">
                  No obstante, BYCIRYDE podrá llevar a cabo las verificaciones
                  para constatar este hecho, adoptando las medidas de diligencia
                  debida que correspondan, conforme a la normativa de protección
                  de datos.
                </li>
              </ul>

              <h2 className="pt-4" id="legitimacion">
                Legitimación – ¿cuál es la legitimación para el tratamiento de
                tus datos?
              </h2>
              <p className="text-justify">
                El tratamiento de datos cuyo fin es el envío de boletines
                periódicos (newslettering) sobre servicios, eventos y noticias
                relacionadas con nuestra actividad profesional se basa en el
                consentimiento del interesado, solicitado expresamente para
                llevar a cabo dichos tratamientos, de acuerdo con la normativa
                vigente. Además, la legitimación para el tratamiento de los
                datos relacionados con ofertas o colaboraciones se basan en el
                consentimiento del usuario que remite sus datos, que puede
                retirar en cualquier momento, si bien ello puede afectar a la
                posible comunicación de forma fluida y obstrucción de procesos
                que desea realizar. Por último, los datos se podrán utilizar
                para dar cumplimiento a las obligaciones legales aplicables a
                BYCIRYDE
              </p>

              <h2 className="pt-4" id="plazo">
                Plazo de Conservación de los Datos – ¿Por cuánto tiempo
                conservaremos tus datos?
              </h2>
              <p className="text-justify">
                BYCIRYDE conservará los datos personales de los usuarios
                únicamente durante el tiempo necesario para la realización de
                las finalidades para las que fueron recogidos, mientras no
                revoque los consentimientos otorgados. Posteriormente, en caso
                de ser necesario, mantendrá la información bloqueada durante los
                plazos legalmente establecidos.
              </p>

              <h2 className="pt-4" id="destinatarios">
                Destinatarios ¿A qué destinatarios se comunicarán tus datos?
              </h2>
              <p className="text-justify">
                Tus datos podrán ser accedidos por aquellos proveedores que
                prestan servicios a BYCIRYDE, tales como servicios de
                alojamiento, herramientas de marketing y sistemas de contenido u
                otros profesionales, cuando dicha comunicación sea necesaria
                normativamente, o para la ejecución de los servicios
                contratados.
              </p>
              <p className="text-justify">
                BYCIRYDE, ha suscrito los correspondientes contratos de encargo
                de tratamiento con cada uno de los proveedores que prestan
                servicios a BYCIRYDE, con el objetivo de garantizar que dichos
                proveedores tratarán tus datos de conformidad con lo establecido
                en la legislación vigente.
              </p>
              <p className="text-justify">
                También podrán ser cedidos a las Fuerzas y Cuerpos de Seguridad
                del Estado en los casos que exista una obligación legal.
              </p>
              <p className="text-justify">
                Bancos y entidades financieras, para el cobro de los servicios.
              </p>
              <p className="text-justify">
                Administraciones públicas con competencia en los sectores de
                actividad, cuando así lo establezca la normativa vigente.
              </p>

              <h2 className="pt-4" id="seguridad">
                Seguridad de la Información – ¿Qué medidas de seguridad
                implantamos para cuidar sus datos?
              </h2>
              <p className="text-justify">
                Para proteger las diferentes tipologías de datos reflejados en
                esta política de privacidad llevará a cabo las medidas de
                seguridad técnicas necesarias para evitar su pérdida,
                manipulación, difusión o alteración.
              </p>
              <ul className="lista pl-4">
                <li className="text-justify">
                  Encriptación de las comunicaciones entre el dispositivo del
                  usuario y los servidores de BYCIRYDE
                </li>
                <li className="text-justify">
                  Encriptación de la información en los propios servidores de
                  BYCIRYDE
                </li>
                <li className="text-justify">
                  Otras medidas que eviten el acceso a los datos del usuario por
                  parte de terceros.
                </li>
                <li className="text-justify">
                  En aquellos casos en los que BYCIRYDE cuente con prestadores
                  de servicio para el mantenimiento de la plataforma que se
                  encuentren fuera de la Unión Europea, estas trasferencias
                  internacionales se hayan regularizadas atendiendo al
                  compromiso de BYCIRYDE con la protección, integridad y
                  seguridad de los datos personales de los usuarios.
                </li>
              </ul>

              <h2 className="pt-4" id="derechos">
                Derechos – ¿Cuáles son tus derechos cuando nos facilitas tus
                datos y cómo puedes ejercerlos?
              </h2>
              <p className="text-justify">
                Tienes derecho a obtener confirmación sobre si en BYCIRYDE
                estamos tratando datos personales que te conciernan, o no.
                Asimismo, tienes derecho a acceder a tus datos personales, así
                como a solicitar la rectificación de los datos inexactos o, en
                su caso, solicitar su supresión cuando, entre otros motivos, los
                datos ya no sean necesarios para los fines que fueron recogidos.
              </p>
              <p className="text-justify">
                En determinadas circunstancias, podrás solicitar la limitación
                del tratamiento de tus datos, en cuyo caso únicamente los
                conservaremos para el ejercicio o la defensa de reclamaciones.
              </p>
              <p className="text-justify">
                En determinadas circunstancias y por motivos relacionados con tu
                situación particular, podrás oponerte al tratamiento de tus
                datos. BYCIRYDE dejará de tratar los datos, salvo por motivos
                legítimos imperiosos, o el ejercicio o la defensa de posibles
                reclamaciones.
              </p>
              <p className="text-justify">
                Asimismo, puedes ejercer el derecho a la portabilidad de los
                datos, así como retirar los consentimientos facilitados en
                cualquier momento, sin que ello afecte a la licitud del
                tratamiento basado en el consentimiento previo a su retirada.
              </p>
              <p className="text-justify">
                Si deseas hacer uso de cualquiera de tus derechos puede
                dirigirse a correo@gmail.com.
              </p>
              <p className="text-justify">
                Por último, te informamos que puedes dirigirte ante la Agencia
                Española de Protección de Datos y demás organismos públicos
                competentes para cualquier reclamación derivada del tratamiento
                de tus datos personales.
              </p>

              <h2 className="pt-4" id="modificaciones">
                Modificación de la política de privacidad
              </h2>
              <p className="text-justify">
                BYCIRYDE podrá modificar la presente Política de Privacidad en
                cualquier momento, siendo publicadas las sucesivas versiones en
                el Sitio Web. En cualquier caso, BYCIRYDE comunicará con previo
                aviso las modificaciones de la presente política que afecten a
                los usuarios a fin de que puedan aceptar las mismas.
              </p>
              <p className="text-justify">
                La presente Política de Privacidad se encuentra actualizada a
                fecha 27/12/2018 BYCIRYDE (España). Reservados todos los
                derechos.
              </p>
              <p className="text-justify">
                Si lo deseas también puedes consultar nuestra&nbsp;
                <a
                  target="_blank"
                  href="/politicas-cookies"
                  className="enlaces"
                >
                   Política de
                  Cookies&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
