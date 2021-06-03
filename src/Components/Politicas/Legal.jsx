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
              <h2>TÉRMINOS LEGALES</h2>
              <ul className="pl-2 pl-md-5 pt-2 indice">
                <li>
                  <a
                    onClick={() => this.desplazarIndice("aviso")}
                    className="enlaceWeb"
                  >
                    Aviso legal y términos de uso
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("condiciones")}
                    className="enlaceWeb"
                  >
                    Condiciones generales de uso
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("personales")}
                    className="enlaceWeb"
                  >
                    Datos personales que recabamos y cómo lo hacemos
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("compromisos")}
                    className="enlaceWeb"
                  >
                    Compromisos y obligaciones de los usuarios
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("medidas")}
                    className="enlaceWeb"
                  >
                    Medidas de seguridad
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("reclamaciones")}
                    className="enlaceWeb"
                  >
                    Reclamaciones
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("plataforma")}
                    className="enlaceWeb"
                  >
                    Plataforma de resolución de conflictos
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("derechos")}
                    className="enlaceWeb"
                  >
                    Derechos de propiedad intelectual e industrial
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("enlaces")}
                    className="enlaceWeb"
                  >
                    Enlaces externos
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("politica")}
                    className="enlaceWeb"
                  >
                    Política de comentarios
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("exclusion")}
                    className="enlaceWeb"
                  >
                    Exclusión de garantías y responsabilidad
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("ley")}
                    className="enlaceWeb"
                  >
                    Ley aplicable y jurisdicción
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.desplazarIndice("contacto")}
                    className="enlaceWeb"
                  >
                    Contacto
                  </a>
                </li>
              </ul>

              <div title="Volver arriba" class="icono_volver_arriba">
                <a href="#">
                  <i class="fas fa-chevron-circle-up"></i>
                </a>
              </div>

              <h2 className="pt-5" id="aviso">
                Aviso legal y términos de uso
              </h2>
              <p className="text-justify">
                En este espacio, el USUARIO, podrá encontrar toda la información
                relativa a los términos y condiciones legales que definen las
                relaciones entre los usuarios y nosotros como responsables de
                esta web. Como usuario, es importante que conozcas estos
                términos antes de continuar tu navegación. titulas.Como
                responsable de esta web, asume el compromiso de procesar la
                información de nuestros usuarios y clientes con plenas garantías
                y cumplir con los requisitos nacionales y europeos que regulan
                la recopilación y uso de los datos personales de nuestros
                usuarios. Esta web, por tanto, cumple rigurosamente con el RGPD
                (REGLAMENTO (UE) 2016/679 de protección de datos) y la LSSI-CE
                la Ley 34/2002, de 11 de julio, de servicios de la sociedad de
                la información y de comercio electrónico.
              </p>

              <h2 className="pt-4" id="condiciones">
                Condiciones generales de uso
              </h2>
              <p className="text-justify">
                Las presentes Condiciones Generales regulan el uso (incluyendo
                el mero acceso) de las páginas de la web, integrantes del sitio
                web de sitio web incluidos los contenidos y servicios puestos a
                disposición en ellas. Toda persona que acceda a la web, sitio
                web (“Usuario”) acepta someterse a las Condiciones Generales
                vigentes en cada momento del portal sitio web.
              </p>

              <h2 className="pt-4" id="personales">
                Datos personales que recabamos y cómo lo hacemos
              </h2>
              <p className="text-justify">
                Leer&nbsp;
                <a
                  target="_blank"
                  href="/politicas-privacidad"
                  className="enlaces"
                >
                  Política de
                  Privacidad &nbsp;<i class="fas fa-external-link-alt"></i> 
                </a>
              </p>

              <h2 className="pt-4" id="compromisos">
                Compromisos y obligaciones de los usuarios
              </h2>
              <p className="text-justify">
                El Usuario queda informado, y acepta, que el acceso a la
                presente web no supone, en modo alguno, el inicio de una
                relación comercial con sitio web. De esta forma, el usuario se
                compromete a utilizar el sitio Web, sus servicios y contenidos
                sin contravenir la legislación vigente, la buena fe y el orden
                público. Queda prohibido el uso de la web, con fines ilícitos o
                lesivos, o que, de cualquier forma, puedan causar perjuicio o
                impedir el normal funcionamiento del sitio web. Respecto de los
                contenidos de esta web, se prohíbe:Su reproducción, distribución
                o modificación, total o parcial, a menos que se cuente con la
                autorización de sus legítimos titulares;Cualquier vulneración de
                los derechos del prestador o de los legítimos titulares;Su
                utilización para fines comerciales o publicitarios.
              </p>
              <p className="text-justify">
                En la utilización de la web, sitio web, el Usuario se compromete
                a no llevar a cabo ninguna conducta que pudiera dañar la imagen,
                los intereses y los derechos de sitio web o de terceros o que
                pudiera dañar, inutilizar o sobrecargar el portal (indicar
                dominio) o que impidiera, de cualquier forma, la normal
                utilización de la web. No obstante, el Usuario debe ser
                consciente de que las medidas de seguridad de los sistemas
                informáticos en Internet no son enteramente fiables y que, por
                tanto sitio web no puede garantizar la inexistencia de virus u
                otros elementos que puedan producir alteraciones en los sistemas
                informáticos (software y hardware) del Usuario o en sus
                documentos electrónicos y ficheros contenidos en los mismos.
              </p>

              <h2 className="pt-4" id="medidas">
                Medidas de seguridad
              </h2>
              <p className="text-justify">
                Los datos personales comunicados por el usuario a sitio web
                pueden ser almacenados en bases de datos automatizadas o no,
                cuya titularidad corresponde en exclusiva a sitio web, asumiendo
                ésta todas las medidas de índole técnica, organizativa y de
                seguridad que garantizan la confidencialidad, integridad y
                calidad de la información contenida en las mismas de acuerdo con
                lo establecido en la normativa vigente en protección de datos.
              </p>
              <p className="text-justify">
                La comunicación entre los usuarios y sitio web utiliza un canal
                seguro, y los datos transmitidos son cifrados gracias a
                protocolos a https, por tanto, garantizamos las mejores
                condiciones de seguridad para que la confidencialidad de los
                usuarios esté garantizada.
              </p>

              <h2 className="pt-4" id="reclamaciones">
                Reclamaciones
              </h2>
              <p className="text-justify">
                sitio web informa que existen hojas de reclamación a disposición
                de usuarios y clientes. El Usuario podrá realizar reclamaciones
                solicitando su hoja de reclamación o remitiendo un correo
                electrónico a correo@gmail.com indicando su nombre y apellidos,
                el servicio y/o producto adquirido y exponiendo los motivos de
                su reclamación.
              </p>
              <p className="text-justify">
                El usuario/comprador podrá notificarnos la reclamación, bien a
                través de correo electrónico a: correo@gmail.com, si lo desea
                adjuntando el siguiente formulario de reclamación: El
                servicio/producto: Adquirido el día: Nombre del usuario:
                Domicilio del usuario: Firma del usuario (solo si se presenta en
                papel): Fecha: Motivo de la reclamación:e.
              </p>

              <h2 className="pt-4" id="plataforma">
                Plataforma de resolución de conflictos
              </h2>
              <p className="text-justify">
                Por si puede ser de tu interés, para someter tus reclamaciones
                puedes utilizar también la plataforma de resolución de litigios
                que facilita la Comisión Europea y que se encuentra disponible
                en el siguiente enlace:&nbsp;
                <a
                  target="_blank"
                  href="http://ec.europa.eu/consumers/odr/"
                  className="enlaces"
                >
                  
                  http://ec.europa.eu/consumers/odr/&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>

              <h2 className="pt-4" id="derechos">
                Derechos de propiedad intelectual e industrial
              </h2>
              <p className="text-justify">
                En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo
                segundo, de la Ley de Propiedad Intelectual, quedan expresamente
                prohibidas la reproducción, la distribución y la comunicación
                pública, incluida su modalidad de puesta a disposición, de la
                totalidad o parte de los contenidos de esta página web, con
                fines comerciales, en cualquier soporte y por cualquier medio
                técnico, sin la autorización de sitio web. El usuario se
                compromete a respetar los derechos de Propiedad Intelectual e
                Industrial titularidad de sitio web.
              </p>
              <p className="text-justify">
                El usuario conoce y acepta que la totalidad del sitio web,
                conteniendo sin carácter exhaustivo el texto, software,
                contenidos (incluyendo estructura, selección, ordenación y
                presentación de los mismos) podcast, fotografías, material
                audiovisual y gráficos, está protegida por marcas, derechos de
                autor y otros derechos legítimos, de acuerdo con los tratados
                internacionales en los que España es parte y otros derechos de
                propiedad y leyes de España. En el caso de que un usuario o un
                tercero consideren que se ha producido una violación de sus
                legítimos derechos de propiedad intelectual por la introducción
                de un determinado contenido en la web, deberá notificar dicha
                circunstancia a sitio web indicando:
              </p>
              <p className="text-justify">
                Datos personales del interesado titular de los derechos
                presuntamente infringidos, o indicar la representación con la
                que actúa en caso de que la reclamación la presente un tercero
                distinto del interesado..
              </p>
              <p className="text-justify">
                Señalar los contenidos protegidos por los derechos de propiedad
                intelectual y su ubicación en la web, la acreditación de los
                derechos de propiedad intelectual señalados y declaración
                expresa en la que el interesado se responsabiliza de la
                veracidad de las informaciones facilitadas en la notificación
              </p>

              <h2 className="pt-4" id="enlaces">
                Enlaces externos
              </h2>
              <p className="text-justify">
                Las páginas de la web sitio web, podría proporcionar enlaces a
                otros sitios web propios y contenidos que son propiedad de
                terceros. El único objeto de los enlaces es proporcionar al
                Usuario la posibilidad de acceder a dichos enlaces. sitio web no
                se responsabiliza en ningún caso de los resultados que puedan
                derivarse al Usuario por acceso a dichos enlaces.
              </p>
              <p className="text-justify">
                Asimismo, el usuario encontrará dentro de este sitio, páginas,
                promociones, programas de afiliados que acceden a los hábitos de
                navegación de los usuarios para establecer perfiles. Esta
                información siempre es anónima y no se identifica al usuario..
              </p>
              <p className="text-justify">
                La Información que se proporcione en estos Sitios patrocinado o
                enlaces de afiliados está sujeta a las políticas de privacidad
                que se utilicen en dichos Sitios y no estará sujeta a esta
                política de privacidad. Por lo que recomendamos ampliamente a
                los Usuarios a revisar detalladamente las políticas de
                privacidad de los enlaces de afiliado.
              </p>
              <p className="text-justify">
                El Usuario que se proponga establecer cualquier dispositivo
                técnico de enlace desde su sitio web al portal sitio web deberá
                obtener la autorización previa y escrita de sitio web El
                establecimiento del enlace no implica en ningún caso la
                existencia de relaciones entre sitio web y el propietario del
                sitio en el que se establezca el enlace, ni la aceptación o
                aprobación por parte de sitio web de sus contenidos o servicios
              </p>

              <h2 className="pt-4" id="politica">
                Política de comentarios
              </h2>
              <p className="text-justify">
                En nuestra web y se permiten realizar comentarios para
                enriquecer los contenidos y realizar consultas. No se admitirán
                comentarios que no estén relacionados con la temática de esta
                web, que incluyan difamaciones, agravios, insultos, ataques
                personales o faltas de respeto en general hacia el autor o hacia
                otros miembros. También serán suprimidos los comentarios que
                contengan información que sea obviamente engañosa o falsa, así
                como los comentarios que contengan información personal, como,
                por ejemplo, domicilios privado o teléfonos y que vulneren
                nuestra política de protección de datos.
              </p>
              <p className="text-justify">
                Se desestimará, igualmente, aquellos comentarios creados sólo
                con fines promocionales de una web, persona o colectivo y todo
                lo que pueda ser considerado spam en general.
              </p>
              <p className="text-justify">
                No se permiten comentarios anónimos, así como aquellos
                realizados por una misma persona con distintos apodos. No se
                considerarán tampoco aquellos comentarios que intenten forzar un
                debate o una toma de postura por otro usuario.
              </p>

              <h2 className="pt-4" id="exclusion">
                Exclusión de garantías y responsabilidad
              </h2>
              <p className="text-justify">
                El Prestador no otorga ninguna garantía ni se hace responsable,
                en ningún caso, de los daños y perjuicios de cualquier
                naturaleza que pudieran traer causa de:
              </p>
              <p className="text-justify">
                La falta de disponibilidad, mantenimiento y efectivo
                funcionamiento de la web, o de sus servicios y contenidos;
              </p>
              <p className="text-justify">
                La existencia de virus, programas maliciosos o lesivos en los
                contenidos;
              </p>
              <p className="text-justify">
                El uso ilícito, negligente, fraudulento o contrario a este Aviso
                Legal;
              </p>
              <p className="text-justify">
                La falta de licitud, calidad, fiabilidad, utilidad y
                disponibilidad de los servicios prestados por terceros y puestos
                a disposición de los usuarios en el sitio web.
              </p>
              <p className="text-justify">
                El prestador no se hace responsable bajo ningún concepto de los
                daños que pudieran dimanar del uso ilegal o indebido de la
                presente página web.
              </p>

              <h2 className="pt-4" id="ley">
                Ley aplicable y jurisdicción
              </h2>
              <p className="text-justify">
                Con carácter general las relaciones entre sitio web con los
                Usuarios de sus servicios telemáticos, presentes en esta web se
                encuentran sometidas a la legislación y jurisdicción españolas y
                a los tribunales.
              </p>

              <h2 className="pt-4" id="contacto">
                Contacto
              </h2>
              <p className="text-justify">
                En caso de que cualquier Usuario tuviese alguna duda acerca de
                estas Condiciones legales o cualquier comentario sobre el portal
                sitio web, por favor diríjase a correo@gmail.com
              </p>
              <p className="text-justify">
                De parte del equipo que formamos titulas te agradecemos el
                tiempo dedicado en leer este Aviso Legal
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
