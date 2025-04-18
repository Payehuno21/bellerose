// src/components/TicketVenta.js
import React from 'react';

export default function TicketVenta({ venta }) {
  if (!venta) return null;

  const { cliente, productos, total, subtotal, iva, id, metodoPago } = venta;

  return (
    <div
      id="ticket"
      style={{
        fontFamily: 'monospace',
        width: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        color: '#000',
        fontSize: '12px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ maxWidth: '120px', marginBottom: '4px' }}
        />
        <strong>Belle Rose</strong>
        <p>Av. Principal #123
        <br/>Tel: 55-5555-5555</p>
      </div>

      <p><strong>Cliente:</strong> {cliente}</p>
      <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString('es-MX', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>ID:</strong> {id}</p>
      <hr />

      {productos.map((item, idx) => (
        <p key={idx}>
          {item.quantity} x {item.name} - ${item.price * item.quantity}
        </p>
      ))}

      <hr />
      <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
      {iva > 0 && <p><strong>IVA (16%):</strong> ${(subtotal * iva).toFixed(2)}</p>}
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      <p><strong>Pago:</strong> {metodoPago}</p>
      <hr />
      <p style={{ textAlign: 'center', marginTop: '8px' }}>¡Gracias por tu compra!</p>
    </div>
  );
}

// Exportar HTML como string puro (sin abrir ventana)
// Recuerda integrar esta función desde el botón con `window.open` directamente en el `onClick`, para evitar bloqueos por pop-up en navegadores como Chrome u Opera.
export function generarHTMLTicket(venta) {
  const logo = '/logo.png';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Ticket</title>
        <style>
          body { font-family: monospace; font-size: 12px; width: 250px; margin: 0; padding: 20px; }
          .center { text-align: center; }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="${logo}" alt="logo" style="max-width: 100px;" />
          <div><strong>Belle Rose</strong></div>
          <div>Av. Principal #123<br/>Tel: 55-5555-5555</div>
        </div>
        <hr />
        <div><strong>Cliente:</strong> ${venta.cliente}</div>
        <div><strong>Fecha:</strong> ${new Date(venta.fecha).toLocaleString('es-MX', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
        <div><strong>ID:</strong> ${venta.id}</div>
        <hr />
        ${venta.productos.map(item => `
          <div>${item.quantity} x ${item.name} - $${item.price * item.quantity}</div>
        `).join('')}
        <hr />
        <div><strong>Subtotal:</strong> $${venta.subtotal.toFixed(2)}</div>
        ${venta.iva > 0 ? `<div><strong>IVA (16%):</strong> $${(venta.subtotal * venta.iva).toFixed(2)}</div>` : ''}
        <div><strong>Total:</strong> $${venta.total.toFixed(2)}</div>
        <div><strong>Pago:</strong> ${venta.metodoPago}</div>
        <hr />
        <div class="center">¡Gracias por tu compra!</div>
        <script>
          // Este setTimeout mejora la compatibilidad al esperar un poco antes de imprimir.
          // Si se detectan problemas, puedes ajustar el tiempo (300ms recomendado).
          window.onload = function() {
            setTimeout(() => {
              window.print();
              window.onafterprint = () => window.close();
            }, 300);
          }
        </script>
      </body>
    </html>
  `;
}

// Función auxiliar para usar en el botón directamente
export function imprimirDesdeBoton(venta) {
  console.log('[TicketVenta] Botón clicado');
  const win = window.open('', '', 'width=300,height=600');
  if (win) {
    console.log('[TicketVenta] Ventana abierta correctamente');
    win.document.write(generarHTMLTicket(venta));
    win.document.close();
    win.focus();
  } else {
    console.warn('[TicketVenta] 🚫 Ventana bloqueada por el navegador');
    alert("Activa las ventanas emergentes para este sitio.");
  }
}
