import React from "react";

export default class Cookies extends React.Component {

  desplazarIndice(id)  {
    var elemento = document.getElementById(id);
    var posicion = elemento.getBoundingClientRect();
    window.scrollTo(0,(posicion.top-200));
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
              <h2>COOKIES</h2>
              <ul className="pl-2 pl-md-5 pt-2 indice">
              <li>
                  <a onClick={() => this.desplazarIndice("pc")} className="enlaceWeb">
                    Políticas de Cookies
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("er")} className="enlaceWeb">
                    Entidad responsable
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("qslc")} className="enlaceWeb">
                    ¿Qué son las cookies?
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("qtdce")} className="enlaceWeb">
                    ¿Qué tipos de cookies existen?
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("rendimiento")} className="enlaceWeb">
                    Cookies de rendimiento
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("geo")} className="enlaceWeb">
                  Cookies de geo-localización
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("cdr")} className="enlaceWeb">
                    Cookies de registro
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("ana")} className="enlaceWeb">
                  Cookies de analíticas
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("cdp")} className="enlaceWeb">
                    Cookies de publicidad
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("cpdt")} className="enlaceWeb">
                    Cookies publicitarias de terceros
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("deshabilitar")} className="enlaceWeb">
                    ¿Cómo puedo deshabilitar las cookies en mi navegador?
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("masSobreCookies")} className="enlaceWeb">
                    ¿Para saber más sobre las cookies?
                  </a>
                </li>
                <li>
                  <a onClick={() => this.desplazarIndice("actualizacionesCambios")} className="enlaceWeb">
                    Actualizaciones y cambios en la política de
                    privacidad/cookies
                  </a>
                </li>
              </ul>
              <div title="Volver arriba" class="icono_volver_arriba">
                <a href="#"><i class="fas fa-chevron-circle-up"></i></a>
              </div>
              <h2 className="pt-5" id="pc">Política de Cookies</h2>
              <p className="text-justify">
                En esta web se utilizan cookies de terceros y propias para
                conseguir que tengas una mejor experiencia de navegación, puedas
                compartir contenido en redes sociales y para que podamos obtener
                estadísticas de los usuarios.
              </p>
              <p className="text-justify">
                Puedes evitar la descarga de cookies a través de la
                configuración de tu navegador, evitando que las cookies se
                almacenen en su dispositivo.
              </p>
              <p className="text-justify">
                Como propietario de este sitio web, te comunico que no
                utilizamos ninguna información personal procedente de cookies,
                tan sólo realizamos estadísticas generales de visitas que no
                suponen ninguna información personal.
              </p>
              <p className="text-justify">
                Es muy importante que leas la presente política de cookies y
                comprendas que, si continúas navegando, consideraremos que
                aceptas su uso.
              </p>
              <p className="text-justify">
                Según los términos incluidos en el artículo 22.2 de la Ley
                34/2002 de Servicios de la Sociedad de la Información y Comercio
                Electrónico, si continúas navegando, estarás prestando tu
                consentimiento para el empleo de los referidos mecanismos.
              </p>

              <h2 className="pt-4" id="er">Entidad Responsable</h2>
              <p className="text-justify">
                La entidad responsable de la recogida, procesamiento y
                utilización de tus datos personales, en el sentido establecido
                por la Ley de Protección de Datos Personales es la página
                BYCIRIDE, propiedad de Adrián Morató – .
              </p>

              <h2 className="pt-4" id="qslc">¿Qué son las cookies?</h2>
              <p className="text-justify">
                Las cookies son un conjunto de datos que un servidor deposita en
                el navegador del usuario para recoger la información de registro
                estándar de Internet y la información del comportamiento de los
                visitantes en un sitio web. Es decir, se trata de pequeños
                archivos de texto que quedan almacenados en el disco duro del
                ordenador y que sirven para identificar al usuario cuando se
                conecta nuevamente al sitio web. Su objetivo es registrar la
                visita del usuario y guardar cierta información. Su uso es común
                y frecuente en la web ya que permite a las páginas funcionar de
                manera más eficiente y conseguir una mayor personalización y
                análisis sobre el comportamiento del usuario.
              </p>

              <h2 className="pt-4" id="qtdce">¿Qué tipos de cookies existen?</h2>
              <p className="text-justify">
                Las cookies utilizadas en nuestro sitio web, son de sesión y de
                terceros, y nos permiten almacenar y acceder a información
                relativa al idioma, el tipo de navegador utilizado, y otras
                características generales predefinidas por el usuario, así como,
                seguir y analizar la actividad que lleva a cabo, con el objeto
                de introducir mejoras y prestar nuestros servicios de una manera
                más eficiente y personalizada.
              </p>
              <p className="text-justify">
                Las cookies, en función de su permanencia, pueden dividirse en
                cookies de sesión o permanentes. Las que expiran cuando el
                usuario cierra el navegador. Las que expiran en función de
                cuando se cumpla el objetivo para el que sirven (por ejemplo,
                para que el usuario se mantenga identificado en los servicios de
                Adrián Morató) o bien cuando se borran manualmente.
              </p>
              <p className="text-justify">
                Adicionalmente, en función de su objetivo, las cookies pueden
                clasificarse de la siguiente forma:
              </p>

              <h2 className="pt-4" id="rendimiento">Cookies de rendimiento</h2>
              <p className="text-justify">
                Este tipo de Cookie recuerda sus preferencias para las
                herramientas que se encuentran en los servicios, por lo que no
                tiene que volver a configurar el servicio cada vez que usted
                visita. A modo de ejemplo, en esta tipología se incluyen:
                Ajustes de volumen de reproductores de vídeo o sonido. Las
                velocidades de transmisión de vídeo que sean compatibles con su
                navegador. Los objetos guardados en el “carrito de la compra” en
                los servicios de e-commerce tales como tiendas.
              </p>

              <h2 className="pt-4" id="geo">Cookies de geo-localización</h2>
              <p className="text-justify">
                Estas cookies son utilizadas para averiguar en qué país se
                encuentra cuando se solicita un servicio. Esta cookie es
                totalmente anónima, y sólo se utiliza para ayudar a orientar el
                contenido a su ubicación.
              </p>

              <h2 className="pt-4" id="cdr">Cookies de registro</h2>
              <p className="text-justify">
                Las cookies de registro se generan una vez que el usuario se ha
                registrado o posteriormente ha abierto su sesión, y se utilizan
                para identificarle en los servicios con los siguientes
                objetivos:
              </p>
              <p className="text-justify">
                Mantener al usuario identificado de forma que, si cierra un
                servicio, el navegador o el ordenador y en otro momento u otro
                día vuelve a entrar en dicho servicio, seguirá identificado,
                facilitando así su navegación sin tener que volver a
                identificarse. Esta funcionalidad se puede suprimir si el
                usuario pulsa la funcionalidad [cerrar sesión], de forma que
                esta cookie se elimina y la próxima vez que entre en el servicio
                el usuario tendrá que iniciar sesión para estar identificado.
              </p>
              <p className="text-justify">
                Comprobar si el usuario está autorizado para acceder a ciertos
                servicios, por ejemplo, para participar en un concurso.
              </p>
              <p className="text-justify">
                Adicionalmente, algunos servicios pueden utilizar conectores con
                redes sociales tales como Facebook o Twitter. Cuando el usuario
                se registra en un servicio con credenciales de una red social,
                autoriza a la red social a guardar una Cookie persistente que
                recuerda su identidad y le garantiza acceso a los servicios
                hasta que expira. El usuario puede borrar esta Cookie y revocar
                el acceso a los servicios mediante redes sociales actualizando
                sus preferencias en la red social que específica.
              </p>

              <h2 className="pt-4" id="ana">Cookies de analíticas</h2>
              <p className="text-justify">
                Cada vez que un usuario visita un servicio, una herramienta de
                un proveedor externo genera una cookie analítica en el ordenador
                del usuario. Esta cookie que sólo se genera en la visita,
                servirá en próximas visitas a los servicios de Adrián Morató
                para identificar de forma anónima al visitante. Los objetivos
                principales que se persiguen son:
              </p>
              <p className="text-justify">
                Permitir la identificación anónima de los usuarios navegantes a
                través de la cookie (identifica navegadores y dispositivos, no
                personas) y por lo tanto la contabilización aproximada del
                número de visitantes y su tendencia en el tiempo.
              </p>
              <p className="text-justify">
                Identificar de forma anónima los contenidos más visitados y por
                lo tanto más atractivos para los usuarios Saber si el usuario
                que está accediendo es nuevo o repite visita.
              </p>
              <p className="text-justify">
                Importante: Salvo que el usuario decida registrarse en un
                servicio de Adrián Morató, la cookie nunca irá asociada a ningún
                dato de carácter personal que pueda identificarle. Dichas
                cookies sólo serán utilizadas con propósitos estadísticos que
                ayuden a la optimización de la experiencia de los usuarios en el
                sitio.
              </p>

              <h2 className="pt-4" id="cdp">Cookies de publicidad</h2>
              <p className="text-justify">
                Este tipo de cookies permiten ampliar la información de los
                anuncios mostrados a cada usuario anónimo en los servicios de
                Adrián Morató. Entre otros, se almacena la duración o frecuencia
                de visualización de posiciones publicitarias, la interacción con
                las mismas, o los patrones de navegación y/o comportamientos del
                usuario ya que ayudan a conformar un perfil de interés
                publicitario. De este modo, permiten ofrecer publicidad afín a
                los intereses del usuario.
              </p>

              <h2 className="pt-4" id="cpdt">Cookies publicitarias de terceros</h2>
              <p className="text-justify">
                Además de la publicidad gestionada por las webs de Adrián Morató
                en sus servicios, las webs de Adrián Morató ofrecen a sus
                anunciantes la opción de servir anuncios a través de terceros
                (“Ad-Servers”). De este modo, estos terceros pueden almacenar
                cookies enviadas desde los servicios de Adrián Morató
                procedentes de los navegadores de los usuarios, así como acceder
                a los datos que en ellas se guardan.
              </p>
              <p className="text-justify">
                Las empresas que generan estas cookies tienen sus propias
                políticas de privacidad. En la actualidad, las webs de Adrián
                Morató utilizan la plataforma Doubleclick (Google) para
                gestionar estos servicios. Para más información, acuda a&nbsp;
                <a
                  target="_blank"
                  href="http://www.google.es/policies/privacy/ads/#toc-doubleclick "
                  className="enlaces"
                >
                   http://www.google.es/policies/privacy/ads/#toc-doubleclick&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
                &nbsp;y a&nbsp;
                <a
                  target="_blank"
                  href="http://www.google.es/policies/privacy/ads/"
                  className="enlaces"
                >
                   http://www.google.es/policies/privacy/ads/&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
                .
              </p>

              <h2 className="pt-4" id="deshabilitar">
                ¿Cómo puedo deshabilitar las cookies en mi navegador?
              </h2>
              <p className="text-justify">
                Se pueden configurar los diferentes navegadores para avisar al
                usuario de la recepción de cookies y, si se desea, impedir su
                instalación en el equipo. Asimismo, el usuario puede revisar en
                su navegador qué cookies tiene instaladas y cuál es el plazo de
                caducidad de las mismas, pudiendo eliminarlas.
              </p>
              <p className="text-justify">
                Para ampliar esta información consulte las instrucciones y
                manuales de su navegador:
              </p>
              <p className="text-justify">
                Para más información sobre la administración de las cookies en
                Google Chrome:&nbsp;
                <a
                  href="https://support.google.com/chrome/answer/95647?hl=es"
                  target="_blank"
                  className="enlaces"
                >
                 https://support.google.com/chrome/answer/95647?hl=es&nbsp;<i class="fas fa-external-link-alt"></i> 
                </a>
              </p>
              <p className="text-justify">
                Para más información sobre la administración de las cookies en
                Internet Explorer:&nbsp;
                <a
                  href=" http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions"
                  target="_blank"
                  className="enlaces"
                >
                  http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
              <p>
                Para más información sobre la administración de las cookies en
                Mozilla Firefox:&nbsp;
                <a
                  href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
                  target="_blank"
                  className="enlaces"
                >
                  http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
              <p className="text-justify">
                Para más información sobre la administración de las cookies en
                Safari:&nbsp;
                <a
                  href="http://www.apple.com/es/privacy/use-of-cookies/"
                  target="_blank"
                  className="enlaces"
                >
                  http://www.apple.com/es/privacy/use-of-cookies/&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
              <p className="text-justify">
                Para más información sobre la administración de las cookies en
                Opera:&nbsp;
                <a
                  href="http://help.opera.com/Windows/11.50/es-ES/cookies.html"
                  target="_blank"
                  className="enlaces"
                >
                   http://help.opera.com/Windows/11.50/es-ES/cookies.html&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
              <p className="text-justify">
                Si desea dejar de ser seguido por Google Analytics visite:&nbsp;
                <a
                  href="http://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  className="enlaces"
                >
                 http://tools.google.com/dlpage/gaoptout&nbsp;<i class="fas fa-external-link-alt"></i> 
                </a>
              </p>

              <h2 className="pt-4" id="masSobreCookies">Para saber más sobre las cookies</h2>
              <p className="text-justify">
                Puede obtener más información sobre la publicidad online basada
                en el comportamiento y la privacidad online en el siguiente
                enlace:&nbsp;
                <a href="http://www.youronlinechoices.com/es/" className="enlaces" target="_blank">
                 http://www.youronlinechoices.com/es/&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>
              <p className="text-justify">
                Protección de datos de Google Analytics:
                <a href="http://www.google.com/analytics/learn/privacy.html" className="enlaces" target="_blank"> 
                http://www.google.com/analytics/learn/privacy.html&nbsp;<i class="fas fa-external-link-alt"></i> 
                </a>
              </p>
              <p className="text-justify">
                Cómo usa Google Analytics las cookies:
                <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs" className="enlaces" target="_blank">
                 https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs&nbsp;<i class="fas fa-external-link-alt"></i>
                </a>
              </p>

              <h2 className="pt-4" id="actualizacionesCambios">
                Actualizaciones y cambios en la política de privacidad/cookies
              </h2>
              <p className="text-justify">
                Las webs de Adrián Morató pueden modificar esta Política de
                Cookies en función de exigencias legislativas, reglamentarias, o
                con la finalidad de adaptar dicha política a las instrucciones
                dictadas por la Agencia Española de Protección de Datos, por
                ello se aconseja a los usuarios que la visiten periódicamente.
              </p>
              <p className="text-justify">
                Cuando se produzcan cambios significativos en esta Política de
                Cookies, estos se comunicarán a los usuarios bien mediante la
                web o a través de correo electrónico a los usuarios registrados.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
