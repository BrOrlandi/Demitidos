# Demitidos

## O que é isto?

Há um bom tempo eu desenvolvi um script para que eu pudesse ser notificado por email quando alguém era demitido em uma empresa que eu trabalhei. Decidi deixar este código público apenas por curiosidade das pessoas.

Esta ideia gerou um pouco de polêmica na época pois havia uma preocupação em algumas pessoas estarem sabendo sobre as demissões de forma muito 'antecipada'. Em alguns casos eu descobri que a pessoa seria demitida algumas horas antes da própria pessoa ser demitida na empresa.

Quando foi percebido pela empresa que alguém tinha acesso a essas informações de alguma forma, eu espalhei o script para mais pessoas usarem e assim não terem como saber quem de fato tinha iniciado isso.

## Como eu fiz isto?

Assim como muitas empresas, esta tinha sistema com a lista de ramais de funcionários. Quando alguém era demitido todos os registros da pessoa na empresa eram apagados do sistema. Então caso alguém sumisse desta lista de ramais, ela tinha sido demitida. Isso era simples de fazer, porém eu automatizei isso com um script que fazia o crawling da página e verificava alterações a todo momento. Dessa forma, assim que alguém desaparecesse do sistema do nada, eu sabia que a pessoa foi demitida.

Apesar de identificar demissões era o mais interessante deste script, não era apenas isso que ele fazia. Eu era notificado em qualquer alteração na lista de ramais, isso incluía pessoas que transitavam entre áreas da empresa e pessoas que eram recém-contratadas.

O script foi feito com Google Apps Script, e rodava na infraestrutura do Google, não dentro da infra da empresa como alguns achavam.

## Por que eu fiz isso?

Já leu aquele livro *1984 por George Orwell*? A história do livro se passa numa sociedade onde o estado controlava e monitorava a sociedade. Nessa sociedade, quando alguém se mostrava mais ‘inteligente’, questionando muito ou falando demais sobre assuntos que não agradava o governo, aquela pessoa simplesmente sumia. A pessoa não era mais encontrada no trabalho, no refeitório, junto aos amigos que ela sempre estava. E se pesquisasse nos registros e notícias sobre a pessoa, tudo havia sido apagado, como se aquela pessoa nunca tivesse existido. E eu me sentia um pouco assim quando as pessoas eram demitidas na empresa.

Entendo que a demissão de pessoas é um processo delicado e eu ainda não tenho uma opinião totalmente formada sobre como este procedimento deve ser feito até porque depende muito do motivo pelo qual a pessoa foi demitida. Quando a demissão não está relacionada a um desempenho ou comportamento negativo de um funcionário, acho que não há motivos para a empresa querer evitar que as pessoas comentem isso. Mais cedo ou mais tarde isso acontece e deixa uma imagem que a empresa não está sendo muito transparente com seus colaboradores.

## Por que eu decidi publicar o script

![Meme do capitão Bruno com texto escrito "porque eu quis"](./capbruno.jpg)

Porque eu quis. Não só por isso, acho que foi um código interessante que fiz tentando automatizar uma tarefa. Isto mostra o poder que temos em programar algo e automatizar um processo. Algumas empresas ainda acham que o "cara de TI" tem que executar diversos procedimentos dentro da empresa sendo que muito desse trabalho hoje pode ser automatizado. E por que nem sempre é automatizado? As vezes por falta de conhecimento mas também por que a automação gera demissões.

Se você quiser comentar algo sobre isso tudo, fique a vontade para entrar em contato comigo por e-mail [brorlandi@gmail.com](mailto:brorlandi@gmail.com) ou no Twitter [@BrOrlandi](https://twitter.com/BrOrlandi).

## Sobre o código

Eu editei o código para esconder informações da empresa e fiz comentários sobre como ele funcionava. Basicamente eu fazia um crawling da página armazenando as informações para serem comparadas quando o crawler executasse de novo. O script tinha um trigger configurado e era executado a cada 5 minutos.  
Os passos do algoritmo eram:

* Inicia carregando o conteúdo da página de ramais autenticando meu acesso via Basic Auth.
* Captura nome e área das pessoas na lista através de uma Regex.
* Armazena todas as pessoas em um array.
* Recarregava o array de pessoas da execução anterior do script, caso houvesse.
* Olhava se cada pessoa do array anterior ainda está cadastrada no sistema.
* Tambem olhava se cada pessoa cadastrada não estava cadastrada anteriormente.
* Entre as duas listas, para cada pessoa que não fosse encontrada, era concatenado com o texto do email que estava sendo construído.
* Com isso o conteúdo do e-mail estava pronto com as pessoas que saíram e entraram na lista.
* Havendo alteraçõs na lista a mensagem criada era enviada a partir do meu e-mail pessoal para meu e-mail da empresa.
