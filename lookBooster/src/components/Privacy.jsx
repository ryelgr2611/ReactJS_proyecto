// PrivacyPolicy.js
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../firebase/config';
import Header from './Header';
import Footer from './Footer';
import { TbArrowBadgeDown } from "react-icons/tb";
import './Privacy.css';

const Privacy = () => {

    const [usuario, setUsuario] = useState(null);
    const auth = getAuth(app);
    onAuthStateChanged(auth, (usuarioAuth) => {
        if(usuarioAuth) {
          setUsuario(usuarioAuth);
        } else {
          setUsuario(null);
        }
      });

  return (
    <div>
        
        <Header correoUsuario={usuario ? usuario.email : null} />
        <section className="container text-center mb-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-4 py-4">Política de Privacidad y Cookies</h1>
                    <p className="lead">
                        En nuestra peluquería, nos preocupamos por tu privacidad y queremos que tengas una experiencia segura y transparente al utilizar nuestros servicios.
                    </p>
                    <hr className="my-4" />
                    <p>
                        Queremos asegurarnos de que entiendas cómo recopilamos, utilizamos y protegemos tu información mientras visitas nuestro sitio web y utilizas nuestras aplicaciones. Por eso, te invitamos a leer nuestra Política de Privacidad y Política de Cookies.
                    </p>
                    <div className="mt-5">
                        <p>Al utilizar nuestro servicio, aceptas nuestra <a href="/politica-privacidad">Política de Privacidad</a> y <a href="/politica-cookies">Política de Cookies</a>.</p>
                    </div>
                </div>
            </div>
        </section>
        <h2 className='  text-center fs-3 mb-5 '><TbArrowBadgeDown />A continuacion puedes ver nuestras politicas de privacidad y cookies<TbArrowBadgeDown /></h2>
        <div className="container mb-5">
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Introducción</Accordion.Header>
                <Accordion.Body>
                <p>
                    En LookBooster, Inc., que ejerce su actividad como LookBooster (en adelante, «Empresa»), valoramos su privacidad y la importancia de salvaguardar sus datos. La Política de privacidad (en adelante, «Política») describe nuestras prácticas en relación con las actividades establecidas a continuación. En cuanto a sus derechos, le informamos sobre cómo recopilamos, almacenamos, accedemos y procesamos la información de las personas. En esta Política, el término «Datos personales» hace referencia a toda la información que —por sí sola o en combinación con otra información disponible— pueda identificar a una persona.
                </p>
                <p>
                    Estamos comprometidos a proteger su privacidad de acuerdo con el más alto nivel de regulación. Por esta razón, cumplimos con las obligaciones estipuladas en los siguientes reglamentos:
                </p>
                <ul>
                    <li>Ley de Protección de la Información Personal y Documentos Electrónicos de Canadá (PIPEA) y las legislaciones provinciales aplicables;</li>
                    <li>Ley de Quebec 25;</li>
                    <li>Reglamento General de Protección de Datos de la UE (RGPD);</li>
                    <li>Legislación de Protección de Datos de Brasil (LGPD);</li>
                    <li>California's Consumer Protection Act (CCPA) / California Privacy Rights Act (CPRA) and California Online Privacy Protection Act (CalOPPA);</li>
                    <li>Colorado Privacy Act (CPA);</li>
                    <li>Utah Consumer Privacy Act (UCPA);</li>
                    <li>Connecticut Data Privacy Act (CTDPA);</li>
                    <li>Virginia Consumer Data Protection Act (VCDPA);</li>
                    <li>Ley de Protección de Información Personal de Sudáfrica (POPIA).</li>
                </ul>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Datos Personales que Recopilamos</Accordion.Header>
                <Accordion.Body>
                    <p>Al utilizar nuestra aplicación de reserva de citas en la barbería, recopilamos una variedad de Datos personales para proporcionarle un servicio óptimo y personalizado. Estos datos incluyen, pero no se limitan a:</p>
                    <ul>
                    <li><strong>Información de contacto:</strong> Solicitamos su nombre, dirección de correo electrónico y número de teléfono para poder comunicarnos con usted sobre sus citas y enviarle recordatorios importantes.</li>
                    <li><strong>Información de perfil:</strong> Recolectamos detalles sobre sus preferencias de cita, como la fecha y la hora preferidas, así como el tipo de servicio requerido (corte de pelo, afeitado, tratamiento facial, etc.). Esta información nos ayuda a personalizar su experiencia de reserva y garantizar que se satisfagan sus necesidades específicas.</li>
                    <li><strong>Identificadores específicos de dispositivos móviles:</strong> Al utilizar nuestra aplicación en su dispositivo móvil, recopilamos ciertos identificadores, como el modelo del dispositivo, el IMEI y el número de teléfono. Estos datos nos ayudan a mejorar la funcionalidad de la aplicación y a solucionar cualquier problema técnico que pueda surgir.</li>
                    </ul>
                    <p>Tenga en cuenta que no recopilamos ni almacenamos información financiera ni datos de pago a través de nuestra aplicación, ya que todas las transacciones de pago se realizan directamente en la barbería y no dentro de la aplicación.</p>
                    <p>Recopilamos Datos personales de varias fuentes y a través de diferentes métodos para garantizar la precisión y la seguridad de la información recopilada. Estos son algunos de los métodos que utilizamos para recopilar sus Datos personales:</p>
                    <ul>
                    <li><strong>Interacción directa:</strong> Cuando usted reserva una cita a través de nuestra aplicación, nos proporciona activamente su información de contacto y preferencias de cita. Esta interacción directa nos permite recopilar datos específicos según sus necesidades y preferencias individuales.</li>
                    <li><strong>Tecnologías automatizadas:</strong> Al utilizar nuestra aplicación, recopilamos automáticamente ciertos datos utilizando tecnologías como cookies, registros de servidores y tecnologías similares. Estos datos pueden incluir identificadores específicos de dispositivos móviles y datos de localización, que nos ayudan a mejorar la funcionalidad de la aplicación y a proporcionarle una experiencia personalizada.</li>
                    </ul>
                    <p>Nos comprometemos a proteger la privacidad y la seguridad de sus Datos personales en todo momento. Si tiene alguna pregunta o inquietud sobre cómo recopilamos o utilizamos sus Datos personales, no dude en ponerse en contacto con nuestro equipo de atención al cliente.</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Cookies</Accordion.Header>
                <Accordion.Body>
                <div>
                    <h5>¿Qué son las cookies?</h5>
                    <p>
                    Una cookie es un pequeño archivo de texto que contiene información que su buscador almacena en su dispositivo. La información de este archivo se suele compartir con el propietario del sitio, así como con los socios potenciales y agentes externos a la empresa. La recopilación de esta información podría servir para garantizar el adecuado funcionamiento del sitio o para mejorar su experiencia.
                    </p>
                </div>
                <div>
                    <h5>Cómo usamos las cookies</h5>
                    <p>
                    Para ofrecerle la mejor experiencia posible, utilizamos los siguientes tipos de cookies:
                    </p>
                    <ul>
                    <li>Estrictamente necesarias. Como aplicación web, es necesario que utilicemos ciertas cookies para ofrecer nuestro servicio.</li>
                    <li>De preferencias. Utilizamos cookies de preferencias para recordar de qué manera le gusta utilizar nuestro servicio. Algunas cookies se utilizan para personalizar el contenido y ofrecerle una experiencia a medida. Por ejemplo, se podría utilizar la ubicación para ofrecerle servicios y ofertas cerca de usted.</li>
                    <li>De análisis. Obtenemos datos estadísticos sobre el perfil de las personas que visitan nuestro sitio para mejorar nuestro servicio y producto.</li>
                    </ul>
                </div>
                <div>
                    <h5>Cómo gestionar sus cookies</h5>
                    <p>
                    Siempre y cuando la cookie no sea estrictamente necesaria, podrá optar por permitir o no su uso en cualquier momento. Para modificar la forma de la que obtenemos información sobre usted, visite nuestro Administrador de cookies.
                    </p>
                </div>
                <div className="lookbooster-cookie-table-container">
                    <h5>Cookies funcionales</h5>
                    <p>
                    Estas cookies están configuradas para proporcionar el servicio, la aplicación o los recursos solicitados. Sin estas cookies, su solicitud no se puede entregar adecuadamente. Por lo general, están configurados para administrar las acciones realizadas por usted, como solicitar elementos visuales del sitio web, recursos de páginas o inicio de sesión/registro del usuario debido.
                    </p>
                    
                </div>
                <div className="lookbooster-cookie-table-container">
                    <h5>Cookies de análisis</h5>
                    <p>
                    Estas cookies son establecidas por nosotros o por proveedores de servicios de terceros que utilizamos para implementar funcionalidades adicionales o para mejorar las características y el rendimiento del sitio web, sin embargo, no están directamente relacionados con el servicio que solicitó. Los servicios y las funcionalidades implementadas por estas cookies admiten características como cuadro de texto relleno automático, plataforma de chat web en vivo, formularios no necesitados y parámetros de seguridad opcionales como un solo inicio de sesión (SSO).
                    </p>
                    
                </div>
                <div className="lookbooster-cookie-table-container">
                    <h5>Cookies de marketing</h5>
                    <p>
                    Estas cookies están configuradas para proporcionar medidas cuantitativas de los visitantes del sitio web. La información recopilada con estas cookies se utiliza en operaciones para medir el sitio web o los KPI de software, como el rendimiento. Con el uso de estas cookies, podemos contar visitas y fuentes de tráfico para mejorar el rendimiento de nuestro sitio y la aplicación. Si no permite estas cookies, no sabremos cuándo ha visitado nuestro sitio.
                    </p>
                    
                </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Conservación y Eliminación</Accordion.Header>
                <Accordion.Body>
                <p>
                    Solo conservaremos sus Datos personales durante el tiempo que sea necesario para el fin con el que se recopilaron y en la medida en que lo exija la legislación aplicable. Cuando ya no necesitemos sus Datos personales, los eliminaremos de nuestro sistema y/o tomaremos medidas para convertirlos en anónimos.
                </p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Seguridad de sus Datos</Accordion.Header>
                <Accordion.Body>
                <p>
                En caso de involucrarnos en una fusión, adquisición o venta de activos, sus Datos personales podrían transferirse. Le enviaremos un aviso antes de transferir sus Datos personales y antes de que estén sujetos a una política de privacidad diferente. En determinadas circunstancias, es posible que se nos solicite que divulguemos sus Datos personales si así lo exige la ley o en respuesta a solicitudes válidas de las autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).
                </p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
                <Accordion.Header>Sus Derechos Relativos a sus Datos Personales</Accordion.Header>
                <Accordion.Body>
                    <p>
                        Usted tiene derechos relacionados con sus datos personales de acuerdo con los reglamentos de privacidad de datos de la Unión Europea (RGPD). Entre estos derechos se incluyen los siguientes:
                    </p>
                    <ul>
                        <li>Derecho de acceso: Tiene derecho a saber si estamos procesando sus datos personales y a solicitar una copia de los datos que estamos procesando.</li>
                        <li>Derecho de rectificación: Tiene derecho a que se corrijan los datos personales incorrectos o incompletos que tenemos sobre usted.</li>
                        <li>Derecho al olvido: Tiene derecho a solicitar que eliminemos sus datos personales, a menos que tengamos una razón legítima para retenerlos.</li>
                        <li>Derecho a la limitación del procesamiento: Tiene derecho a restringir el procesamiento de sus datos personales en ciertas circunstancias.</li>
                        <li>Derecho a la portabilidad: Tiene derecho a recibir los datos personales que nos haya proporcionado en un formato estructurado y de uso común.</li>
                        <li>Derecho de oposición: Tiene derecho a oponerse al procesamiento de sus datos personales en ciertas circunstancias.</li>
                        <li>Derecho a no ser objeto de decisiones individuales automatizadas: Tiene derecho a no ser objeto de decisiones basadas únicamente en el procesamiento automatizado de sus datos personales.</li>
                        <li>Derecho a presentar una queja ante una autoridad supervisora: Tiene derecho a presentar una queja ante la autoridad de protección de datos competente si cree que sus derechos de privacidad han sido violados.</li>
                    </ul>
                    <p>
                        Si desea ejercer alguno de estos derechos, puede contactarnos utilizando los datos de contacto proporcionados al final de esta página. Tenga en cuenta que es posible que necesitemos verificar su identidad antes de procesar su solicitud.
                    </p>
                    <p>
                        También tenga en cuenta que si reside en el Espacio Económico Europeo (EEE), puede presentar una reclamación ante la autoridad de protección de datos local competente. Puede encontrar más información sobre sus derechos de privacidad de datos y cómo ejercerlos en el sitio web de la Autoridad Europea de Protección de Datos (EDPB).
                    </p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
                <Accordion.Header>Cambios en la Política de Privacidad</Accordion.Header>
                <Accordion.Body>
                <p>
                Es posible que esta Política sufra alguna modificación en cualquier momento. En caso de que se produzca algún cambio en esta Política, publicaremos la versión actualizada en este sitio web. Al utilizar nuestros servicios, se le pedirá que lea y acepte nuestra Política de privacidad. De esta forma, podremos registrar que la ha aceptado y notificarle las modificaciones que esta Política pueda sufrir en el futuro.                </p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
                <Accordion.Header>Contacto</Accordion.Header>
                <Accordion.Body>
                <p>
                    Si tiene alguna pregunta sobre esta política de privacidad, por favor contáctenos en legal@lookbooster.com.
                </p>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
        <Footer/>
    </div>
   
  );
};

export default Privacy;
