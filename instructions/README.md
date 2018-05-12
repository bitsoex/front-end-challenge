# BITSO FRONT END CHALLENGE

![Front End Challenge Image](https://github.com/bitsoex/front-end-challenge/blob/master/bann_bfec.jpg)

## SOBRE BITSO
Bitso es el exchange de crypto más importante y grande de México. Este posicionamiento lo hemos logrado gracias
a la tecnología que nuestro equipo de ingeniería ha construido. El reto y la misión que tenemos como empresa
crece cada día y siempre estamos buscando al mejor talento de nuestro país.

Para seguir creciendo necesitamos encontrar a los mejores programadores de Front End de México que nos ayuden
a construir mejores gráficas, más herramientas de trading, y proveer una mejor experiencia de usuario a los
cientos de miles de clientes de Bitso.

Ser parte de Bitso significa tener un impacto inmediato en el creciente ecosistema de crypto en México y Latinoamérica,  
construir  productos  dirigidos  a  millones  de  usuarios,  trabajar  directamente  con  los  fundadores  de  Bitso,  
colaborar con un equipo de diseño UX de primer nivel y contribuir con tu código a uno de los mejores equipos de
ingeniería en México.

Los mejores participantes en este Coding Challenge tendrán oportunidad de entrevistarse para formar parte del
equipo  de  Bitso  y  aparte  tenemos  premios  bastante  jugosos.  Así  que  es  que  es  momento  que  demuestres  que  
eres el mejor.   

## LOS PREMIOS
*  1er. lugar $50,000 pesos MN.
*  2do. lugar $30,000 pesos MN.
*  3er. lugar $10,000 pesos MN.

## EL CHALLENGE
1. Haz un fork del siguiente repositorio: https://github.com/bitsoex/front-end-challenge. En él encontrarás
   todos los recursos necesarios.
2.   Tendrás que programar un proyecto traduciendo los diseños en un código robusto, funcional, legible y fácil de mantener.  
3. Tendrás que usar el [API de Bitso](https://bitso.com/api_info).
4. Deberás de usar las siguientes tecnologías obligatoriamente: HTML5, CSS3/Less, JavaScript y React.
Otras tecnologías están totalmente permitidas, siempre y cuando las justifiques (como pre-procesadores, linters, manejadores de paquetes, etc).
5. Tendrás hacer contribuciónes regulares a tu código a partir del momento de que haces tu fork.
6. Cuando tu código esté listo, haz un pull request al repositorio original.
7. Incluye instrucciones claras de como correr tu proyecto en el README.

## PROCESO Y CRITERIOS DE EVALUACIÓN
En Bitso creemos en la igualdad de oportunidades, por lo que para eliminar posibles sesgos durante el proceso de
selección y asegurar un proceso justo para todos los participantes, al momento de evaluar las propuestas eliminamos todos
los identificadores personales y nos enfocamos 100% en evaluar el código y la solución con base en los
siguientes criterios:

1. Calidad del código: 30 puntos
    *  Tu código es legible y funcional (Preferimos código en inglés y con la documentación apropiada para que cualquier miembro del equipo pueda entender fácilmente tu código).
    *  Tu código sigue una buena guía de estilo. (Por favor no hagas entregas con código minimizado o comprimido).
    *  Tu código debe ser fácil de mantener, extender, de cambiar, y de seguir siendo modificado.
    *  Tu código está bien documentado.

2. Eficiencia y escalabilidad: 25 puntos
    * Mediremos el uso de CPU y RAM de tu solución en el diferentes navegadores y sistemas operativos.

3. Fidelidad al diseño: 20 puntos

    * Nuestro equipo de diseño evaluará qué tan cerca está la solución de los diseños proporcionados.

4. Tiempo: 15 puntos

    *  Recibirás 15 puntos si lo entregas antes del 25 de mayo. Empezando el 26 de mayo, perderás un punto
      por cada día que pase. Por ejemplo, soluciones entregadas el 26 de mayo recibirán 14 puntos, soluciones
      entregadas el 27 de mayo recibirán 13 puntos y así sucesivamente hasta el 9 de junio (después de esta
      fecha no se reciben más proyectos).

5. Creatividad: 10 puntos

    *  Evaluaremos la experiencia y talento para encontrar diferentes formas de mejorar el diseño (PS:  es muy
      importante que las justifiques).

6. Extra-puntos: 5 puntos c/u

    * La propuesta deberá ser responsiva y se ajusta a diferentes tamaños de pantalla, especialmente celulares.
    * El código deberá incluir pruebas.

Recuerda seguir todas las instrucciones ya que evaluaremos minuciosamente todos los puntos.

Es momento que seas parte de Bitso y nos ayudes a transformar el mundo.

Disfruta el challenge.

[Consultar las bases generales](https://bitso.com/assets/pdfs/front_end_coding_challenge_2018/bases_generales.pdf).

[Para participar Registrate en esta forma](https://bitsoex.typeform.com/to/F6Zrso).

### Notas sobre el API

Para obtener la información de `open`, `close`, `high` y `low` por día en un periodo de tiempo, deberás consultar el siguiente URL:
```https://bitso.com/trade/chartJSON/<book>/<timeframe>```
dónde `book` es el libro a consultar y `timeframe` puede tomar estos valores:
   * `1month`
   * `3months`
   * `1year`

Por ejemplo: https://bitso.com/trade/chartJSON/btc_mxn/1month , regresa la información de el último mes del mercado BTC/MXN.
