/** @OnlyCurrentDoc */
function enviarCorreos() {
    const libro = SpreadsheetApp.getActiveSpreadsheet();
    libro.setActiveSheet(libro.getSheetByName("Candidatos"));
    const hoja = SpreadsheetApp.getActiveSheet();
    const filas = hoja.getRange("A2:D3").getValues();
    const mapa = Maps.newStaticMap().addMarker("Autentia");
    
    for (indiceFila in filas) {
      var candidato = crearCandidato(filas[indiceFila]);
      enviarCorreo(candidato, mapa);
   }
  }
   
  function crearCandidato(datosFila) {
    const candidato = {
      nick: datosFila[0],
      nombre: datosFila[1],
      email: datosFila[2],    
      puesto: datosFila[3]
    };
    return candidato;
  }
   
  function enviarCorreo(candidato, mapa) {
    if (candidato.email == "") return;
    const plantilla = HtmlService.createTemplateFromFile('phtml');
    plantilla.candidato = candidato;
    const mensaje = plantilla.evaluate().getContent();
    
    MailApp.sendEmail({
      to: candidato.email,
      subject: "Taller de Efectividad personal con GTD y Personal Kanban",
      htmlBody: mensaje,
      attachments:[mapa]
    });
  }
   
  function onOpen() {
    const spreadsheet = SpreadsheetApp.getActive();
    const menuItems = [{name: 'Enviar', functionName: 'enviarCorreos'}];
    spreadsheet.addMenu('Enviar Correos', menuItems);
  }