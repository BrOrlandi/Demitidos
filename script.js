
// esta era a função que rodava a cada 5 minutos
function check() {
  var options = {};
  options.headers = {"Authorization": "Basic xxxx"}; // Aqui eu colocava minha autenticação via Basic Auth, ou seja, meu usuário e senha em Base64.
  options.validateHttpsCertificates = false; // ignorava o certificado HTTPS que era auto assinado.

  try {
    var response = UrlFetchApp.fetch("http://<url do sistema>/twiki/bin/view/Administrativo/ListasRamaisCelulares",options);

    var body = response.getContentText();
    var status = response.getResponseCode();
  }catch(err){
    Logger.log(err); // Logger.log é tipo o console.log porém para rodar no App Script do Google
    return;
  }
  if(status != 200){
    Logger.log("Error, Status Code: "+status);
    return;
  }
  var regex = /<a href="\/twiki\/bin\/view\/Main\/[^"]+".*>([^<]+)<\/a> \(([^\)]*)\)/g; // Essa é a Regex que vai pegar todas as pessoas e suas áreas na página
  var res;
  var now = [];
  while((res = regex.exec(body)) != null){ // Enquanto houver pessoas na regex
    now.push(res[1] + " - " + res[2]); // O primeiro valor é o nome da pessoa, o segundo é a área que ela trabalha
  }

  var properties = PropertiesService.getScriptProperties(); // Aqui estou usando um serviço do App Script que permite armazena chaves e valores
  var before = properties.getProperty('people'); // Estou carregando o array anterior de pessoas
  if(before){
    before = JSON.parse(before); // o valor é armazenado em JSON mas como string.

    var news = false; // aqui eu começo a chamar as demissões de 'news' e as contratações de 'good news'
    var goodnews = false;
    var theNew = "Here are some news:<br><br><br>"; // o email começaca com as pessoas demitidas
    var theGoodNew = "<br><br>Here are some good news:<br><br><br>"; // em seguida com as pessoas que foram contratadas

    before.forEach(function(user){
      // cada pessoa que estava cadastrada é procurada na nova lista
      if(now.indexOf(user) == -1){
        news = true;
        Logger.log("NOT FOUND: "+user);
        theNew = theNew.concat(user+"\n<br>"); // caso a pessoa não esteja na lista, ela saiu da empresa, então seu nome entra no texto do email
      }
    });
    now.forEach(function(user){
      // cada pessoa encontrada na lista é procurada na lista salva em uma execução anterior
      if(before.indexOf(user) == -1){
        goodnews = true;
        theGoodNew = theGoodNew.concat(user+"\n<br>"); // se uma pessoa não foi encontrada na lista anterior, ela é uma pessoa nova na empresa.
      }
    });

    if(news || goodnews){ // se encontrou pessoas que sairam ou entraram na empresa
      if(goodnews){
        theNew = theNew.concat(theGoodNew);
      }
      theNew = theNew.concat("<br><br>People before: "+before.length+"<br>People now: "+now.length); // aqui registro no email também quantas pessoas tinha na empresa
      MailApp.sendEmail({
        to: "meuemail@empresa.com", // mandava pro meu email da empresa
        subject:"Check news", // o assunto do email era "Check news", me lembro como era engraçado quando um desses aparecia na minha caixa de entrada
        body: theNew,
        htmlBody: theNew
      });
    }
  }

  Logger.log("People count: "+now.length);
  properties.setProperty('people', JSON.stringify(now)); // salva o JSON com a lista de pessoas de agora para a próxima vez que o script rodar.
}

// Esta era uma função que usava pra testar se o script tava funcionando.
// Eu carregava a lista de pessoas que estava armazenada, excluia propositalmente algumas pessoas e salvava de novo
// Logo se o script estivesse correto eu recebia um email com as alterações
function test(){
  var properties = PropertiesService.getScriptProperties();
  var before = properties.getProperty('people');
  before = JSON.parse(before);
  before.splice(78,2);
  properties.setProperty('people', JSON.stringify(before));
}