# Cómo añadir un cotizador nuevo

Los archivos de esta carpeta contienen **precios de venta al público**. Nunca incluyas costos de hoteles, transportistas, proveedores ni márgenes internos.

## 1. Copia un ejemplo

Copia `ejemplo-ruta-a.json`, cambia el nombre del archivo por un identificador sencillo —por ejemplo `perla-del-sur.json`— y elimina la línea `"ejemplo": true` cuando los datos ya sean reales.

## 2. Completa los campos

- `id`: debe coincidir con el nombre del archivo, sin `.json`.
- `nombre`: nombre visible en español (`es`) e inglés (`en`).
- `noches`: cantidad de noches; determina automáticamente la fecha de regreso y el costo de habitaciones.
- `moneda`: normalmente `USD`.
- `personas.min` y `personas.max`: límites permitidos.
- `precioBase`: precio total del grupo para **cada** cantidad posible de viajeros. No dejes cantidades intermedias sin precio.
- `habitaciones`: tipos disponibles, capacidad de cada unidad y precio de venta por noche.
- `salidas`: lugares de recogida. Si `porPersona` es `false`, el suplemento se suma una vez; si es `true`, se multiplica por viajeros.
- `temporadas`: rangos opcionales. El factor se aplica solamente a `precioBase`.
- `fechasBloqueadas`: fechas de inicio no disponibles, en formato `AAAA-MM-DD`.
- `contacto.whatsapp`: número completo con código de país.
- `contacto.urlReserva`: enlace de reserva directa. Déjalo vacío para usar WhatsApp.

Comprueba que el JSON conserve comas, llaves y comillas correctamente. Si falta un dato, el cotizador no inventará un precio: mostrará el contacto de VIATSA.

## 3. Inserta el componente

En la página del producto, dentro del lugar donde quieras mostrarlo, pega:

```html
<div data-cotizador="perla-del-sur" data-lang="es"></div>
<link rel="stylesheet" href="css/cotizador.css">
<script src="js/cotizador.js" defer></script>
```

Cambia `perla-del-sur` por el nombre de tu JSON. Para iniciar en inglés usa `data-lang="en"`. El CSS y el script se cargan una sola vez por página, aunque haya más de un cotizador.

## 4. Prueba antes de publicar

Abre la página desde un servidor web, elige fecha, personas, habitaciones y salida, y compara el desglose con tu tabla de precios. Revisa también el mensaje de WhatsApp.
